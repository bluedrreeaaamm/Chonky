Chonky uses [react-window](https://github.com/bvaughn/react-window) under the hood.
This means the file entries that are not visible to the user (i.e they are outside of
the visible scroll pane) are unmounted. This gives Chonky _huuuge_ performance gains,
and means you can display very large file collections to your users.