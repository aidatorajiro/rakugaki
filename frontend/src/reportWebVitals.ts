import { CLSMetric, FCPMetric, LCPMetric, TTFBMetric } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: CLSMetric | FCPMetric | LCPMetric | TTFBMetric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
