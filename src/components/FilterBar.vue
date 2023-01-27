<script>
import { mapState } from "pinia";
import { useDataStore } from "../stores/DataStore";
import {
  sortDataItemsByTitle,
  sortDataItemsById,
  sortDataItemsByOutlier,
} from "../data/sortingRule";
import { searchDataItems } from "../data/searchRule";
export default {
  name: "FilterBar",
  data: function () {
    return {
      selectedFiltering: "Ausreißer",
      search: "",
      showVisualizationButton: false,
    };
  },
  computed: {
    ...mapState(useDataStore, ["expensesActual"]),
    ...mapState(useDataStore, ["expensesPlanned"]),
    ...mapState(useDataStore, ["totalDifferenceExpensesActualExpensesPlanned"]),
    ...mapState(useDataStore, [
      "percentageDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, ["filteredExpensesActual"]),
    ...mapState(useDataStore, ["filteredExpensesPlanned"]),
    ...mapState(useDataStore, [
      "filteredTotalDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, [
      "filteredPercentageDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, ["checkedDataItems"]),
    listItems: function () {
      var searchTerm = this.search;
      var selectedFiltering = this.selectedFiltering;

      if (selectedFiltering === "Ausreißer") {
        return searchDataItems(
          sortDataItemsByOutlier(this.expensesActual),
          searchTerm
        );
      }
      if (selectedFiltering === "ID") {
        return searchDataItems(
          sortDataItemsById(this.expensesActual),
          searchTerm
        );
      }
      if (selectedFiltering === "Titel") {
        return searchDataItems(
          sortDataItemsByTitle(this.expensesActual),
          searchTerm
        );
      }
      return this.expensesActual();
    },
  },
  watch: {
    selectedFiltering() {
      this.showVisualizationButton = true;
    },
  },
  methods: {
    handleVisualizationData() {
      this.showVisualizationButton = false;

      this.filteredExpensesActual.splice(0, this.filteredExpensesActual.length);
      this.filteredExpensesPlanned.splice(
        0,
        this.filteredExpensesPlanned.length
      );
      this.filteredTotalDifferenceExpensesActualExpensesPlanned.splice(
        0,
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.length
      );
      this.filteredPercentageDifferenceExpensesActualExpensesPlanned.splice(
        0,
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.length
      );

      let unsortedFilteredExpensesActual = [];
      this.expensesActual.forEach((item) => {
        if (this.checkedDataItems.includes(item.id)) {
          unsortedFilteredExpensesActual.push(item);
        }
      });

      let unsortedFilteredExpensesPlanned = [];
      this.expensesPlanned.forEach((item) => {
        if (this.checkedDataItems.includes(item.id)) {
          unsortedFilteredExpensesPlanned.push(item);
        }
      });

      let unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned = [];
      this.totalDifferenceExpensesActualExpensesPlanned.forEach((item) => {
        if (this.checkedDataItems.includes(item.id)) {
          unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned.push(
            item
          );
        }
      });

      let unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned =
        [];
      this.percentageDifferenceExpensesActualExpensesPlanned.forEach((item) => {
        if (this.checkedDataItems.includes(item.id)) {
          unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned.push(
            item
          );
        }
      });

      if (this.selectedFiltering === "Ausreißer") {
        this.filteredExpensesActual.push(
          sortDataItemsByOutlier(unsortedFilteredExpensesActual)
        );
        this.filteredExpensesPlanned.push(
          sortDataItemsByOutlier(unsortedFilteredExpensesPlanned)
        );
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsByOutlier(
            unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned
          )
        );
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsByOutlier(
            unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned
          )
        );
      }
      if (this.selectedFiltering === "ID") {
        this.filteredExpensesActual.push(
          sortDataItemsById(unsortedFilteredExpensesActual)
        );
        this.filteredExpensesPlanned.push(
          sortDataItemsById(unsortedFilteredExpensesPlanned)
        );
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsById(
            unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned
          )
        );
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsById(
            unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned
          )
        );
      }
      if (this.selectedFiltering === "Titel") {
        this.filteredExpensesActual.push(
          sortDataItemsByTitle(unsortedFilteredExpensesActual)
        );
        this.filteredExpensesPlanned.push(
          sortDataItemsByTitle(unsortedFilteredExpensesPlanned)
        );
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsByTitle(
            unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned
          )
        );
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsByTitle(
            unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned
          )
        );
      }
    },
  },
};
</script>

<template>
  <div class="filterbar-wrapper bg-blue">
    <div class="pt-4 px-4">
      <v-text-field
        v-model="search"
        label="Suche"
        hide-details="auto"
        variant="underlined"
        class="mb-4"
      ></v-text-field>
      <v-select
        v-model="selectedFiltering"
        label="Sortierung"
        :items="['Ausreißer', 'ID', 'Titel']"
        variant="underlined"
      ></v-select>
    </div>
    <v-list
      select-strategy="multiple"
      bg-color="transparent"
      style="margin-bottom: 5rem"
    >
      <v-list-item
        v-for="(item, index) in listItems"
        :key="{ index }"
        :value="item.id"
        class="px-1"
        variant="plain"
      >
        <template #prepend>
          <v-list-item-action start>
            <v-checkbox-btn
              v-model="expensesActual[index].checked"
              :model-value="expensesActual[index].checked"
              @change="
                expensesActual[index].checked
                  ? checkedDataItems.push(expensesActual[index].id)
                  : checkedDataItems.pop(expensesActual[index].id),
                  (showVisualizationButton = checkedDataItems.length)
              "
            ></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-tooltip
          :text="`${item.id} ${item.title}`"
          open-delay="1200"
          location="bottom"
        >
          <template #activator="{ props }">
            <v-list-item-title v-bind="props"
              >{{ item.id }} {{ item.title }}</v-list-item-title
            >
          </template>
        </v-tooltip>
        <template #append>
          <v-tooltip :text="`Ausreißerscore: ${item.outlierScore}%`">
            <template #activator="{ props }">
              <v-btn
                :color="item.outlierScoreColor"
                icon="mdi-information"
                variant="text"
                alt="moin"
                v-bind="props"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-list-item>
    </v-list>
    <div v-if="showVisualizationButton" class="filterbar-button-container">
      <v-btn
        class="filterbar-button"
        size="x-large"
        prepend-icon="mdi-chart-timeline-variant"
        @click="handleVisualizationData"
      >
        Auswahl visualisieren
      </v-btn>
    </div>
  </div>
</template>

<style>
.filterbar-wrapper {
  width: 25rem;
  height: calc(100vh - 64px);
  overflow: scroll;
}
.filterbar-button-container {
  position: absolute;
  bottom: 0;
  left: 0;
}
.filterbar-button {
  width: 22rem;
  margin: 2rem 1rem;
}
</style>
