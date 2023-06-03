import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

const ChartGraph = ({ reprovados, aprovados, pendentes, type }) => {
  //  const [aprovadas, setAprovadas] = useState(0);
  //  const [reprovadas, setReprovadas] = useState(0);
  //  const [pendending, setPending] = useState(0);

  //   useEffect(() => {

  //   }, []);
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
  reprovados: PropTypes.number.isRequired,
  aprovados: PropTypes.number.isRequired,
  pendentes: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
export default ChartGraph;
