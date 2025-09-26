export type ConfirmOptions = {
  title: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
  dismissible?: boolean;
};

export type ModalDescriptor =
  | {
      id: string;
      kind: 'confirm';
      props: ConfirmOptions;
      resolve: (value: boolean) => void;
    }
  | {
      id: string;
      kind: 'custom';
      render: (controls: { close: () => void }) => React.ReactNode;
      resolve?: (value?: unknown) => void;
      dismissible?: boolean;
    };
