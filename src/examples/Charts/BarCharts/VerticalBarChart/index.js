import { useMemo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import configs from "examples/Charts/BarCharts/VerticalBarChart/configs";
import colors from "assets/theme/base/colors";

function VerticalBarChart({ title, description, height, width, chart }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <SoftBox p={2}>
      {title || description ? (
        <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SoftBox mb={1}>
              <SoftTypography variant="h6">{title}</SoftTypography>
            </SoftBox>
          )}
          <SoftBox mb={2}>
            <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ) : null}
      {useMemo(
        () => (
          <SoftBox height={height} width={width}>
            <Bar data={data} options={options} />
          </SoftBox>
        ),
        [chart, height, width]
      )}
    </SoftBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

VerticalBarChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
  width: "100%", // Default width
};

VerticalBarChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Prop for width
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default VerticalBarChart;
