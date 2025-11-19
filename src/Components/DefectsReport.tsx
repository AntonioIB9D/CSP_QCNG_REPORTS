import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

type DefectsReportProps = {
  shift: string | number;
};

const styles = StyleSheet.create({
  section: { margin: 10, padding: 10 },
  title: {
    fontSize: 20,
    color: "#0068FF",
    marginBottom: 10,
    fontWeight: "bold",
  },
  station: { fontSize: 14, marginTop: 10, color: "#28A745" },
  defect: { fontSize: 10, marginLeft: 10 },
  paragraph: { height: 2, marginTop: -2, backgroundColor: "#CFA011" },
  text: { fontSize: 10, marginTop: 5, color: "#868E96", fontStyle: "italic" },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#0068FF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const DefectsReport: React.FC<DefectsReportProps> = ({ shift }) => (
  <Document>
    <Page>
      <View style={styles.section}>
        <Text style={styles.title}>Defects Report (Shift {shift})</Text>
        <View style={styles.paragraph} />
        <Text style={styles.text}>
          In this report, you can review all the defects registered in the
          different process areas, like a D-Flash, Drill, Paint & Final Assembly
        </Text>
        <View>
          <Text style={styles.subtitle}>D-Flash</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Drill</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Paint</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Final Assembly</Text>
        </View>
      </View>
    </Page>
  </Document>
);
