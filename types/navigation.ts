export type RootStackParamList = {
  UserInformation: undefined;
  Map: undefined;
  EditUserModal: undefined;
  CompassOnly: {
    uri?: string;
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
};

export type DrawerParamList = {
  MainStack: undefined;
};
