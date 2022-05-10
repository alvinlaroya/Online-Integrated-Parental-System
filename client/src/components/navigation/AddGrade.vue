<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title class="ml-2">Add Grade</v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                        v-model="grade.semester"
                        :rules="requiredRules"
                        :items="['1st', '2nd']"
                        label="Semester"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="grade.sy"
                        :rules="requiredRules"
                        label="School Year"
                        hint="Ex: 2020-2021"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="11">
                      <h1>Add Grade Per Subjects</h1>
                    </v-col>
                    <v-col cols="1" class="text-right">
                      <v-btn
                        color="primary"
                        style="height: 60px"
                        @click="addRow"
                      >
                        <span style="font-size: 30px">+</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="(grade, i) in grades"
                    :key="i"
                    class="mt-5"
                    style="margin-bottom: -45px"
                  >
                    <v-col cols="8">
                      <v-autocomplete
                        v-model="grades[i].subject"
                        :items="allSubject"
                        label="Select Subject"
                        item-text="name"
                        return-object
                        outlined
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="grades[i].grade"
                        :rules="requiredRules"
                        label="Grade"
                        type="number"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <v-btn
                        v-if="grades.length > 1"
                        color="error"
                        style="height: 60px"
                        @click="removeSubject(i)"
                        block
                      >
                        <span style="font-size: 15px">Remove</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid class="mt-10">
                  <v-row align="center" justify="end">
                    <v-btn
                      color="success"
                      class="mr-4 ml-5"
                      x-large
                      @click="validate"
                    >
                      Save Grade
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      :right="true"
      :top="true"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    birthDateMenu: null,
    issuedAtMenu: null,
    issuedOnMenu: null,
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        href: "dashboard",
      },
      {
        text: "Add Grade",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
    valid: true,
    name: "",
    requiredRules: [(v) => !!v || "This field is required"],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    search: "",
    grade: {
      semester: "1st",
      sy: "",
    },
    grades: [{ subject: {}, grade: 0 }],
    student: {
      fname: "",
      mname: "",
      lname: "",
      address: "",
      birthDate: "",
      age: 0,
      gender: "Male",
      civilStatus: "",
      phone: "",
      guardian: {},
    },
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
    ],
  }),
  computed: {
    ...mapGetters(["relatedCase", "parents", "allSubject"]),
  },
  mounted() {
    this.fetchUsers();
    this.fetchSubject();
    this.grade.sy = `${new Date().getFullYear()}-${
      new Date().getFullYear() + 1
    }`;
  },
  methods: {
    ...mapActions(["fetchUsers", "addGrade", "fetchSubject"]),
    setVerified() {
      this.clearance.verified = !this.clearance.verified;
    },
    addRow() {
      this.grades.push({ subject: {}, grade: 0 });
    },
    removeSubject(i) {
      this.grades.splice(i, 1);
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        let gradesParam = [];

        this.grades.map((grade) => {
          gradesParam.push({
            studentId: this.$route.params.id,
            subjectCode: grade.subject.code,
            subjectDesc: grade.subject.description,
            subjectUnit: grade.subject.unit,
            grade: grade.grade,
            semester: this.grade.semester,
            sy: this.grade.sy,
          });
        });
        this.addGrade(gradesParam);
        this.$refs.form.reset();
        this.snackbar = true;
        this.snackbarText = "Student Grade Created!";
        this.$router.replace({ name: "navigation.dashboard" });

        this.$swal({
          position: "center",
          icon: "success",
          title: "Student Grade Created!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    selectIdPicture(file) {
      this.clearance.idPicture = file;
    },
    selectedBarangayClearance(file) {
      this.clearance.barangayClearance = file;
    },
    selectedCedula(file) {
      this.clearance.cedula = file;
    },
    selectedOrt(file) {
      this.clearance.ort = file;
    },
    toFormData(obj) {
      var fd = new FormData();
      for (var i in obj) {
        fd.append(i, obj[i]);
      }
      return fd;
    },
    searchCrimeCase() {
      this.searchCase(this.search);
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
};
</script>

<style></style>
