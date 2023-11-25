const { createContext, useContext, useState } = require("react");

//criação do contexto
const AppContext = createContext({
  nome: null,
});

// provedor do contexto através de um componente
export function AppProvider(props) {
  const [dadosCompartilhados, setDadosCompartilhados] =
    useState("Dadosiniciais");
  return (
    <AppContext.Provider value={{ nome: "Texto Context API" }}>
      {props.children}
    </AppContext.Provider>
  );
}
// disponibilizar dados
export function useAppContext() {
  return useContext(AppContext);
}
