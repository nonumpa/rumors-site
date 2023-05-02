/* eslint-env browser */

import * as Y from 'yjs';
// import { WebsocketProvider } from 'y-websocket'
import { HocuspocusProvider } from '@hocuspocus/provider';
import {
  ySyncPlugin,
  ySyncPluginKey,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from './schema.js';
import { DOMParser } from 'prosemirror-model';
import { exampleSetup } from 'prosemirror-example-setup';
import { keymap } from 'prosemirror-keymap';
// import * as random from 'lib0/random.js'
// import { html, render } from 'lit-html';
// import * as dom from 'lib0/dom.js';
// import * as pair from 'lib0/pair.js';
import { useRef, useEffect, forwardRef } from 'react';
import useCurrentUser from 'lib/useCurrentUser';
// import './prosemirror.css';

/**
 * @typedef {Object} Version
 * @property {number} date
 * @property {Uint8Array} snapshot
 * @property {number} clientID
 */

/**
 * @param {Y.Doc} doc
 */
const addVersion = doc => {
  const versions = doc.getArray('versions');
  const prevVersion =
    versions.length === 0 ? null : versions.get(versions.length - 1);
  const prevSnapshot =
    prevVersion === null
      ? Y.emptySnapshot
      : Y.decodeSnapshot(prevVersion.snapshot);
  const snapshot = Y.snapshot(doc);
  if (prevVersion != null) {
    // account for the action of adding a version to ydoc
    prevSnapshot.sv.set(
      prevVersion.clientID,
      /** @type {number} */ (prevSnapshot.sv.get(prevVersion.clientID)) + 1
    );
  }
  if (!Y.equalSnapshots(prevSnapshot, snapshot)) {
    versions.push([
      {
        date: new Date().getTime(),
        snapshot: Y.encodeSnapshot(snapshot),
        clientID: doc.clientID,
      },
    ]);
  }
};

// const liveTracking = /** @type {HTMLInputElement} */ (dom.element('input', [
//   pair.create('type', 'checkbox'),
//   pair.create('name', 'yjs-live-tracking'),
//   pair.create('value', 'Live Tracking '),
// ]));

// const updateLiveTrackingState = editorstate => {
//   setTimeout(() => {
//     const syncState = ySyncPluginKey.getState(editorstate.state);
//     liveTracking.checked =
//       syncState.prevSnapshot != null && syncState.snapshot == null;
//   }, 500);
// };

// const renderVersion = (editorview, version, prevSnapshot) => {
//   const transaction = editorview.state.tr.setMeta(ySyncPluginKey, {
//     snapshot: Y.decodeSnapshot(version.snapshot),
//     prevSnapshot:
//       prevSnapshot == null ? Y.emptySnapshot : Y.decodeSnapshot(prevSnapshot),
//   });
//   console.log(transaction);
//   editorview.dispatch(transaction);
//   updateLiveTrackingState(editorview);
// };

// const unrenderVersion = editorview => {
//   const binding = ySyncPluginKey.getState(editorview.state).binding;
//   if (binding != null) {
//     binding.unrenderSnapshot();
//   }
//   updateLiveTrackingState(editorview);
// };

/**
 * @param {EditorView} editorview
 * @param {Version} version
 * @param {Version|null} prevSnapshot
 */
// const versionTemplate = (editorview, version, prevSnapshot) =>
//   html`
//     <div
//       class="version-list"
//       @click=${e => renderVersion(editorview, version, prevSnapshot)}
//     >
//       ${new Date(version.date).toLocaleString()}
//     </div>
//   `;

// const versionList = (editorview, doc) => {
//   const versions = doc.getArray('versions');
//   return html`
//     <div>
//       ${versions.length > 0
//         ? versions.map((version, i) =>
//             versionTemplate(
//               editorview,
//               version,
//               i > 0 ? versions.get(i - 1).snapshot : null
//             )
//           )
//         : html`
//             <div>No snapshots..</div>
//           `}
//     </div>
//   `;
// };

// const snapshotButton = doc => {
//   return html`
//     <button @click=${e => addVersion(doc)}>Snapshot</button>
//   `;
// };

/**
 * @param {HTMLElement} parent
 * @param {Y.Doc} doc
 * @param {EditorView} editorview
 */
// export const attachVersion = (parent, doc, editorview) => {
//   let open = false
//   const rerender = () => {
//     render(html`<div class="version-modal" ?hidden=${open}>${snapshotButton(doc)}${versionList(editorview, doc)}</div>`, vContainer)
//   }
//   updateLiveTrackingState(editorview)
//   liveTracking.addEventListener('click', e => {
//     if (liveTracking.checked) {
//       const versions = doc.getArray('versions')
//       const lastVersion = versions.length > 0 ? Y.decodeSnapshot(versions.get(versions.length - 1).snapshot) : Y.emptySnapshot
//       editorview.dispatch(editorview.state.tr.setMeta(ySyncPluginKey, { snapshot: null, prevSnapshot: lastVersion }))
//     } else {
//       unrenderVersion(editorview)
//     }
//   })
//   parent.insertBefore(liveTracking, null)
//   parent.insertBefore(dom.element('label', [
//     pair.create('for', 'yjs-live-tracking')
//   ], [
//     dom.text('Live Tracking ')
//   ]), null)
//   const btn = document.createElement('button')
//   btn.setAttribute('type', 'button')
//   btn.textContent = 'Versions'
//   btn.addEventListener('click', () => {
//     open = !open
//     unrenderVersion(editorview)
//     rerender()
//   })
//   const vContainer = document.createElement('div')
//   parent.insertBefore(btn, null)
//   parent.insertBefore(vContainer, null)
//   doc.getArray('versions').observe(rerender)
//   rerender()
// }

const testUsers = [
  { username: 'Alice', color: '#ecd444', lightColor: '#ecd44433' },
  { username: 'Bob', color: '#ee6352', lightColor: '#ee635233' },
  { username: 'Max', color: '#6eeb83', lightColor: '#6eeb8333' },
  { username: 'Dax', color: '#6eeb83', lightColor: '#6eeb8333' },
  { username: 'Qax', color: '#6eeb83', lightColor: '#6eeb8333' },
  { username: 'Wax', color: '#6eeb83', lightColor: '#6eeb8333' },
  { username: 'Jax', color: '#6eeb83', lightColor: '#6eeb8333' },
  { username: 'Gax', color: '#6eeb83', lightColor: '#6eeb8333' },
];

const colors = [
  { light: '#ecd44433', dark: '#ecd444' },
  { light: '#ee635233', dark: '#ee6352' },
  { light: '#6eeb8333', dark: '#6eeb83' },
];

const user = testUsers[Math.floor(Math.random() * testUsers.length)];

const CollaborateEditor = ({ articleId }) => {
  const editor = useRef(null);
  const currentUser = useCurrentUser();
  useEffect(() => {
    if (!currentUser) return;
    const ydoc = new Y.Doc();
    const permanentUserData = new Y.PermanentUserData(ydoc);
    console.log('currentUser: ' + JSON.stringify(currentUser));
    permanentUserData.setUserMapping(ydoc, ydoc.clientID, currentUser.name);
    ydoc.gc = false;
    // const provider = new WebsocketProvider('wss://demos.yjs.dev', 'prosemirror-versions-demo', ydoc)
    const provider = new HocuspocusProvider({
      url: 'ws://127.0.0.1:1234',
      // url: process.env.PUBLIC_HOCUSPOCUS_URL,
      name: articleId,
      broadcast: false,
      token: 'John',
      document: ydoc,
      onAwarenessChange: ({ states }) => {
        console.log('provider', states);
      },
    });
    provider.setAwarenessField('user', {
      name: currentUser.name,
      // name: user.username,
      color: user.color,
      // document_name: this.options.collaboration.document,
    });
    const yXmlFragment = ydoc.get('prosemirror', Y.XmlFragment);

    window.view = new EditorView(editor.current, {
      state: EditorState.create({
        schema,
        doc: DOMParser.fromSchema(schema).parse(editor.current),
        plugins: [
          ySyncPlugin(yXmlFragment, { permanentUserData, colors }),
          yCursorPlugin(provider.awareness),
          yUndoPlugin(),
          keymap({
            'Mod-z': undo,
            'Mod-y': redo,
            'Mod-Shift-z': redo,
          }),
        ].concat(exampleSetup({ schema })),
      }),
    });
  }, [articleId, currentUser]);

  return (
    <div className="CollaborateEditor">
      <div ref={editor} />
    </div>
  );
};

export default forwardRef(CollaborateEditor);
