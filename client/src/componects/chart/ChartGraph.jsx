import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import ApresentacaoService from "../../service/ApresentacaoService";
import { UserState } from "../../context/UserProvider";

const ChartGraph = ({ type }) => {
  const [aprovados, setAprovados] = useState(0);
  const [reprovados, setReprovados] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const { user } = UserState();
  const fetchApresentacoes = async () => {
    const aprove = await ApresentacaoService.getApresentacoesEspecificas(
      user.token,
      "APROVADO"
    );
    const pending = await ApresentacaoService.getApresentacoesEspecificas(
      user.token,
      "PENDENTE"
    );
    const reprove = await ApresentacaoService.getApresentacoesEspecificas(
      user.token,
      "REPROVADO"
    );
    console.log(aprove);
    setAprovados(aprove.tamanho);
    setPendentes(pending.tamanho);
    setReprovados(reprove.tamanho);
  };
  useEffect(() => {
    fetchApresentacoes();
  }, []);
  const options = {
    pieHole: 0.4,
    is3D: false,
  };
  return (
    <>
      {type === "ColumnChart" ? (
        <Chart
          chartType={type}
          data={[
            ["Apresentacoes", "Disponiveis", { role: "style" }],
            ["Pendentes", pendentes, "#FBD649"], // RGB value
            ["Reprovados", reprovados, "#FF9F9F"], // English color name
            ["Aprovados", aprovados, "#ACFD7D"],
          ]}
          width="100%"
          height="300px"
          legendToggle
        />
      ) : (
        <Chart
          chartType={type}
          width="100%"
          height="300px"
          data={[
            ["aprsentacoes", "Disponiveis"],
            ["Aprovaodos", aprovados],
            ["Reprovados", reprovados],
            ["Pendentes", pendentes],
          ]}
          options={options}
        />
      )}
    </>
  );
};
ChartGraph.propTypes = {
  type: PropTypes.string.isRequired,
};
export default ChartGraph;
