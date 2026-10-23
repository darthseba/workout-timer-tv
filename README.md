# Workout Timer · TV display

Static Google Cast Custom Web Receiver. Publish this directory as the root of an HTTPS static site, then register its index URL in Google Cast Developer Console.

Only these receiver files belong in the public hosting repository. The Flutter application and its Git history are not needed.

The page receives the clock and optional display labels/logo through the Google Cast namespace `urn:x-cast:cl.sebastianvega.workouttimer`. It does not contain Spotify credentials, payment information, a database or user account configuration. Workout display values arrive at runtime, are rendered with textContent and remain in receiver memory. It loads Google's Cast SDK from gstatic.com.

Requires physical Chromecast testing before publishing the Cast application for general availability. When no updates arrive for five seconds, it shows a disconnected message rather than claiming the clock is live.
