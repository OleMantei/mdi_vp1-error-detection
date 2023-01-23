<script>
import {
  getFilteredExpensesActual,
  getFilteredExpensesPlanned,
  getFilteredTotalDifferenceExpensesActualExpensesPlanned,
  getFilteredPercentageDifferenceExpensesActualExpensesPlanned,
} from "../data/dataService";
import {
  sortDataItemsByTitle,
  sortDataItemsById,
  sortDataItemsByOutlier,
} from "../data/sortingRule";
export default {
  name: "FilterBar",
  data: function () {
    return {
      select: "Ausreißer",
      filteredExpensesActual: getFilteredExpensesActual(),
      filteredExpensesPlanned: getFilteredExpensesPlanned(),
      filteredTotalDifferenceExpensesActualExpensesPlanned:
        getFilteredTotalDifferenceExpensesActualExpensesPlanned(),
      filteredPercentageDifferenceExpensesActualExpensesPlanned:
        getFilteredPercentageDifferenceExpensesActualExpensesPlanned(),
      selectedFiltering: "Ausreißer",
    };
  },
  computed: {
    filteredExpensesActualItems: function () {
      var selectedFiltering = this.selectedFiltering;

      if (selectedFiltering === "Ausreißer") {
        return sortDataItemsByOutlier(this.filteredExpensesActual);
      }
      if (selectedFiltering === "ID") {
        return sortDataItemsById(this.filteredExpensesActual);
      }
      if (selectedFiltering === "Titel") {
        return sortDataItemsByTitle(this.filteredExpensesActual);
      }
      return getFilteredExpensesActual();
    },
  },
};
</script>

<template>
  <div class="filterbar-wrapper bg-blue">
    <div class="pt-4 px-4">
      <v-text-field
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
    <v-list select-strategy="multiple" bg-color="transparent">
      <div
        v-for="(item, index) in filteredExpensesActualItems"
        :key="{ index }"
      >
        <v-list-item :value="item.id" class="px-1" variant="plain">
          <template #prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
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
      </div>
    </v-list>
  </div>
</template>

<style>
.filterbar-wrapper {
  width: 25rem;
  height: 100%;
}
</style>
