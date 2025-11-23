export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  PerfilUsuario: undefined;
  ProfissaoUsuario: undefined;
  ConteudosTrilha: { idTrilha: string };
  ConteudoTrilha: { idTrilha: string; idConteudo: string; nomeTrilha: string };
};