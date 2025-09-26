'use client';

import { emitModal, uid } from './bus';
import type { ConfirmOptions, ModalDescriptor } from './types';

export const modal = {
  confirm(opts: ConfirmOptions) {
    return new Promise<boolean>((resolve) => {
      const id = uid();
      const payload: ModalDescriptor = {
        id,
        kind: 'confirm',
        props: { dismissible: true, ...opts },
        resolve,
      };
      emitModal({ type: 'open', payload });
    });
  },

  open(render: Extract<ModalDescriptor, { kind: 'custom' }>['render'], dismissible = true) {
    const id = uid();
    emitModal({
      type: 'open',
      payload: { id, kind: 'custom', render, dismissible },
    });
    return {
      id,
      close: () => emitModal({ type: 'close', id }),
    };
  },

  closeAll() {
    emitModal({ type: 'clear' });
  },
};
