import { Box } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

Chart.register(CategoryScale);

const ChartGraph = ({ reprovados, aprovados, pendentes, type }) => {
const [chartData, setChartData] = useState({
labels: ["Pendentes", "Aprovados", "Reprovados"],
datasets: [
{
label: "Status dos usuarios ",
data: [0, 0, 0],
backgroundColor: ["#FBD679", "#ACE87D", "#FE9F9F"],
},
],
});

useEffect(() => {
setChartData({
labels: ["Pendentes", "Aprovados", "Reprovados"],
datasets: [
{
label: "Status das Apresentacoes ",
data: [pendentes, aprovados, reprovados],
backgroundColor: ["#FBD679", "#ACE87D", "#FE9F9F"],
},
],
});
}, []);
return (
<Box display="flex" justifyContent="center" alignItems="center" flex={1}>
{type === "doughnut" && <Doughnut data={chartData} />}
{type === "bar" && <Bar data={chartData} />}
</Box>
);
};
ChartGraph.propTypes = {
reprovados: PropTypes.number.isRequired,
aprovados: PropTypes.number.isRequired,
pendentes: PropTypes.number.isRequired,
type: PropTypes.string.isRequired,
};
export default ChartGraph;
