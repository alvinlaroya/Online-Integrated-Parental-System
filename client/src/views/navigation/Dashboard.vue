<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6">SICAT College | Students</v-card-title>
          <v-card-subtitle>List of students</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-toolbar flat>
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6">
                  <v-btn color="primary" dark @click="addStudent()"
                    >Add Student</v-btn
                  >
                </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Student"
                    single-line
                    style="margin-top: 10px"
                    hide-details
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-toolbar>
          <v-card-text>
            <v-data-table
              :search="search"
              :headers="headers"
              :items="allStudents"
              loading-text="Loading... Please wait"
              no-results-text="No Available Article"
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <!-- <v-btn color="warning" small>Edit</v-btn> -->
                <v-btn
                  color="primary"
                  small
                  class="ml-1"
                  @click="addGradeHandler(item)"
                  >Insert Grade</v-btn
                >
              </template>
              <template v-slot:item.birthDate="{ item }">
                {{ dateFormat(item.birthDate) }}
              </template>
            </v-data-table>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    dialog: false,
    currentItem: {},
    viewDialog: false,
    dialogDisplayImage: "",
    search: "",
    tab: null,
    headers: [
      {
        text: "Actions",
        value: "actions",
        align: "start",
        sortable: false,
        width: 150 /* 210 */,
      },
      { text: "Last name", value: "lname" },
      { text: "First name", value: "fname" },
      { text: "Middle name", value: "mname" },
      { text: "Address", value: "address" },
      { text: "Phone", value: "phone" },
      { text: "Age", value: "age" },
      { text: "Date of Birth", value: "birthDate", width: 154 },
      { text: "Civil Status", value: "civilStatus" },
      { text: "Gender", value: "gender" },
      { text: "Guardian Name", value: "parentName" },
      { text: "Guardian Contact", value: "parentPhone" },
    ],
    printObj: {
      id: "printMe",
      popTitle: "Police Clearance",
      extraCss: "../../assets/css/style.css",
      extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      beforeOpenCallback(vue) {
        vue.printLoading = true;
        console.log("打开之前");
      },
      openCallback(vue) {
        vue.printLoading = false;
        console.log("执行了打印");
      },
      closeCallback(vue) {
        console.log("关闭了打印工具");
      },
    },
  }),
  methods: {
    ...mapActions([
      "fetchStudents",
      "setCurrentClearance",
      "approveClearanceAction",
    ]),
    viewItem(item) {
      this.currentItem = item;
      this.viewDialog = true;
    },
    addStudent() {
      this.$router.push({ name: "student.create" });
    },
    addGradeHandler(item) {
      this.$router.push({ name: "student.add.grade", params: { id: item.id } });
    },
    editItem(item) {
      this.setCurrentClearance(item);
      this.$router.push({ name: "clearance.update" });
    },
    downloadItem(item) {
      console.log(item);
    },
    categoryFormat(item) {
      if (item === 1) return "Customers";
      if (item === 2) return "Competitors";
      if (item === 3) return "Produtcts";
      if (item === 4) return "Social Media";
    },
    dateFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    dateTimeFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    displayImage(src) {
      return `http://localhost:8000/${src}`;
    },
    viewImage(src) {
      this.dialog = true;
      this.dialogDisplayImage = src;
    },
  },
  computed: {
    ...mapGetters([
      "allStudents",
      "verifiedClearance",
      "badges",
      "issuedClearanceCount",
    ]),
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style>
@import "../../assets/css/style.css";
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
