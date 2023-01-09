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
      filteredExpensesActual: getFilteredExpensesActual(),
      filteredExpensesPlanned: getFilteredExpensesPlanned(),
      filteredTotalDifferenceExpensesActualExpensesPlanned:
        getFilteredTotalDifferenceExpensesActualExpensesPlanned(),
      filteredPercentageDifferenceExpensesActualExpensesPlanned:
        getFilteredPercentageDifferenceExpensesActualExpensesPlanned(),
      selectedFiltering: "unsorted",
    };
  },
  computed: {
    filteredExpensesActualItems: function () {
      var selectedFiltering = this.selectedFiltering;

      if (selectedFiltering === "title") {
        return sortDataItemsByTitle(this.filteredExpensesActual);
      }
      if (selectedFiltering === "id") {
        return sortDataItemsById(this.filteredExpensesActual);
      }
      if (selectedFiltering === "outlier") {
        return sortDataItemsByOutlier(this.filteredExpensesActual);
      }
      return getFilteredExpensesActual();
    },
  },
};
</script>

<template>
  <div class="filterbar-wrapper bg-blue">
    <p class="text-h6 bg-blue text-center pa-2">🚧 Filter Seitenleiste</p>
    <hr />
    <div class="pt-4 px-2">
      <label class="mr-2"
        ><input
          v-model="selectedFiltering"
          class="mr-1"
          type="radio"
          value="unsorted"
        />unsorted</label
      >
      <label class="mr-2"
        ><input
          v-model="selectedFiltering"
          class="mr-1"
          type="radio"
          value="title"
        />title</label
      >
      <label class="mr-2"
        ><input
          v-model="selectedFiltering"
          class="mr-1"
          type="radio"
          value="id"
        />id</label
      >
      <label class="mr-2"
        ><input
          v-model="selectedFiltering"
          class="mr-1"
          type="radio"
          value="outlier"
        />outlier</label
      >
    </div>
    <div class="py-4 px-2">
      <p class="text-subtitle-1">Aufwendungen IST</p>
      <p class="text-caption font-italic mb-3">
        (filtered, sorted by {{ selectedFiltering }})
      </p>
      <div
        v-for="(item, index) in filteredExpensesActualItems"
        :key="{ index }"
        class="mb-2"
      >
        <p class="text-body-2">{{ item.id }} {{ item.title }}</p>
        <span class="text-caption" :style="{ color: item.outlierScoreColor }"
          >Ausreißer Score: {{ item.outlierScore }}</span
        >
        <span class="text-caption"> | z.B. 2010: {{ item["2010"] }}</span>
      </div>
    </div>
    <hr />
    <div class="py-4 px-2">
      <p class="text-subtitle-1">Aufwendungen PLANUNG</p>
      <p class="text-caption font-italic mb-3">(filtered, unsorted)</p>
      <div
        v-for="(item, index) in filteredExpensesPlanned"
        :key="{ index }"
        class="mb-2"
      >
        <p class="text-body-2">{{ item.id }} {{ item.title }}</p>
        <span class="text-caption" :style="{ color: item.outlierScoreColor }"
          >Ausreißer Score: {{ item.outlierScore }}</span
        >
        <span class="text-caption"> | z.B. 2010: {{ item["2010"] }}</span>
      </div>
    </div>
    <hr />
    <div class="py-4 px-2">
      <p class="text-subtitle-1">Aufwendungen Differenz Total</p>
      <p class="text-caption font-italic mb-3">(filtered, unsorted)</p>
      <div
        v-for="(
          item, index
        ) in filteredTotalDifferenceExpensesActualExpensesPlanned"
        :key="{ index }"
        class="mb-2"
      >
        <p class="text-body-2">{{ item.id }} {{ item.title }}</p>
        <span class="text-caption" :style="{ color: item.outlierScoreColor }"
          >Ausreißer Score: {{ item.outlierScore }}</span
        >
        <span class="text-caption"> | z.B. 2010: {{ item["2010"] }}</span>
      </div>
    </div>
    <hr />
    <div class="py-4 px-2">
      <p class="text-subtitle-1">Aufwendungen Differenz Prozent</p>
      <p class="text-caption font-italic mb-3">(filtered, unsorted)</p>
      <div
        v-for="(
          item, index
        ) in filteredPercentageDifferenceExpensesActualExpensesPlanned"
        :key="{ index }"
        class="mb-2"
      >
        <p class="text-body-2">{{ item.id }} {{ item.title }}</p>
        <span class="text-caption" :style="{ color: item.outlierScoreColor }"
          >Ausreißer Score: {{ item.outlierScore }}</span
        >
        <span class="text-caption"> | z.B. 2010: {{ item["2010"] }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>

<style>
.filterbar-wrapper {
  width: 25rem;
  height: 100%;
}
</style>
