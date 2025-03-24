export type RootStackParamList = {
  UserInformation: undefined;
  Map: undefined;
  EditUserModal: undefined;
  CompassOnly: {
    uri?: string;
    degree?: number;
  };
  TableOfContents: undefined;
  ImagePickerModal: {
    from: keyof RootStackParamList;
  };
  SolutionPDF: undefined;
  StarsPDF: undefined;
  MinhTuanBookPDF: {
    page?: number;
  };
  RotateCompassModal: {
    from: keyof RootStackParamList;
  };
};

export type DrawerParamList = {
  MainStack: undefined;
};
