const { createContext, useState, useEffect, useContext } = require("react");

// Crie um contexto
const LocalStorageContext = createContext({ nome: null });

// Crie um componente de provedor para envolver sua aplicação
export function LocalStorageProvider(props) {
  const [localStorageData, setLocalStorageData] = useState(undefined);
  useEffect(() => {
    console.log("entrou no useEffect do handleStorageUpdate");
    
    // Assine o evento de armazenamento para ouvir as atualizações no LocalStorage;
    const handleStorageUpdate = (e) => {
        
      //if (e.key === 'user') {
      console.log("entrou no if localStorageData" + localStorageData);
      setLocalStorageData(localStorage.getItem("user"));
      //}
    };
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      // Certifique-se de remover o ouvinte quando o componente é desmontado;
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);
  return (
    <LocalStorageContext.Provider value={{ localStorageData }}>
      {props.children}
    </LocalStorageContext.Provider>
  );
}
// Viabilizar o acesso ao contexto
export function useLocalStorage() {
  return useContext(LocalStorageContext);
}
