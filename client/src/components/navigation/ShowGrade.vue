<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="text-h6"
              ><a @click="$router.go(-1)" style="margin-right: 10px">Go back</a>
              | Show Grade
            </v-card-title>
            <v-card-subtitle>List of grades</v-card-subtitle>
            <v-spacer></v-spacer>
            <v-toolbar flat>
              <v-container fluid>
                <v-row class="mt-5">
                  <v-col md="3" xs="3" sm="3" lg="3">
                    <v-select
                      v-model="semester"
                      :items="['1st', '2nd']"
                      label="Semester"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col md="3" xs="3" sm="3" lg="3">
                    <v-select
                      v-model="sy.from"
                      :items="years"
                      label="SY From"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col md="3" xs="3" sm="3" lg="3">
                    <v-select
                      v-model="sy.to"
                      :items="years"
                      label="SY To"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col md="2" xs="2" sm="2" lg="2">
                    <v-btn
                      color="success"
                      style="height: 50px"
                      large
                      block
                      @click="filterHandler"
                      >Filter</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="allGrades"
                loading-text="Loading... Please wait"
                no-results-text="No Available Article"
                class="elevation-0"
              >
              </v-data-table>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h2 style="color: black">
                      Average: {{ average || "No Average" }}
                    </h2>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    semester: "1st",
    sy: {
      from: new Date().getFullYear() - 1,
      to: new Date().getFullYear(),
    },
    currentSubject: {},
    headers: [
      {
        text: "Student ID",
        value: "studentId",
      },
      {
        text: "Subject Code",
        value: "subjectCode",
      },
      { text: "Subject Description", value: "subjectDesc" },
      { text: "Grade", value: "grade" },
      { text: "Unit", value: "subjectUnit" },
      { text: "Semester", value: "semester" },
      { text: "School Year", value: "sy" },
    ],
    valid: true,
    validEdit: true,
    requiredRules: [(v) => !!v || "This field is required"],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["fetchGradeByStudent"]),
    filterHandler() {
      this.fetchGradeByStudent({
        studentId: this.$route.params.id,
        sy: this.sy,
        semester: this.semester,
      });
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
  },
  computed: {
    ...mapGetters(["allGrades", "average"]),
    years() {
      let years = [];
      for (let i = 1995; i <= new Date().getFullYear() + 1; i++) {
        years.push(i);
      }

      return years;
    },
  },
  mounted() {
    this.fetchGradeByStudent({
      studentId: this.$route.params.id,
      sy: this.sy,
      semester: this.semester,
    });
  },
};
</script>

<style></style>
