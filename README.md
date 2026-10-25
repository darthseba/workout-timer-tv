# Workout Timer · TV display

Static Google Cast Custom Web Receiver. Publish this directory as the root of an HTTPS static site, then register its index URL in Google Cast Developer Console.

Only these receiver files belong in the public hosting repository. The Flutter application and its Git history are not needed.

The page receives the clock and optional display labels/logo through the Google Cast namespace `urn:x-cast:cl.sebastianvega.workouttimer`. It does not contain Spotify credentials, payment information, a database or user account configuration. Workout display values arrive at runtime, are rendered with textContent and remain in receiver memory. It loads Google's Cast SDK from gstatic.com.

Requires physical Chromecast testing before publishing the Cast application for general availability. When no updates arrive for five seconds, it shows a disconnected message rather than claiming the clock is live.

## Audio protocol v1
The sender relays actual timer audio events through the existing custom namespace.
Each event contains a session ID, increasing sequence, sender timestamp, volume,
and the clock frame from the same timer update. The receiver preloads the same
15 configured sound choices as the phone, including the three reference WAVs.
`audioBaseline` skips history on connect/reconnect; repeated heartbeats do not
replay cues. Paused or sender-side stale (>1500 ms) events are consumed silently.
The receiver renders the cue's clock frame and starts its audio locally. This
avoids screen mirroring, but does not guarantee zero network/audio latency.
Playback startup/failure is reported through `audioReport`; actual audibility and
clock/audio alignment still require physical validation on the Cast device.
The phone's own sounds remain enabled during this initial validation.

Publish index.html, audio.js, sounds.js, audio/, AUDIO_LICENSE.txt and this README
together. Keep `.nojekyll`. Sound assets derive from the MIT-licensed local
background_hiit_timer package; retain AUDIO_LICENSE.txt. Do not publish Flutter
source or any device/session data. Local tests: node tools/test_tv_audio.cjs from
repository root, plus Flutter cast_audio_events_test/audio_cues/for_time/tv tests.
