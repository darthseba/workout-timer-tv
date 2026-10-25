(function (root) {
  'use strict';
  // The sender owns the timer. Heartbeats may repeat cues; IDs never do.
  function createCueReceiver(play, stop) {
    let session = null;
    let sequence = 0;
    return function receive(state) {
      if (state.audioProtocol !== 1) return;
      const incoming = typeof state.audioSession === 'string' ? state.audioSession : '';
      const latest = Number.isSafeInteger(state.audioSequence) ? state.audioSequence : 0;
      if (session === null || state.audioBaseline === true) {
        session = incoming;
        sequence = latest;
        stop();
        return;
      }
      if (session !== incoming) {
        session = incoming;
        sequence = 0;
        stop();
      }
      if (state.paused) stop();
      for (const cue of Array.isArray(state.audioCues) ? state.audioCues : []) {
        if (!Number.isSafeInteger(cue.id) || cue.id <= sequence) continue;
        sequence = cue.id;
        // Compare sender timestamps, avoiding assumptions about the TV clock.
        const age = state.sentAt - cue.at;
        if (state.paused || !Number.isFinite(age) || age < 0 || age > 1500) continue;
        if (typeof cue.sound !== 'string' || typeof cue.volume !== 'number' ||
            !Number.isFinite(cue.volume) || cue.volume <= 0) continue;
        play(cue);
      }
    };
  }
  root.WorkoutTvAudio = { createCueReceiver };
  if (typeof module !== 'undefined') module.exports = root.WorkoutTvAudio;
})(typeof globalThis !== 'undefined' ? globalThis : this);
