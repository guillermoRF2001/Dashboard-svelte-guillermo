<script>
  import { scaleLinear } from 'd3';
  import { dataBySurvivingByEmbarked, filters } from '../stores_titanic';
  import { flip } from "svelte/animate";

  let width, height = 400;
  let xScale, yScale;

  const colors = {
    "C": '#e3e4e5',
    "Q": '#763c28',
    "S": '#efb810'
  };

  $: filteredData = $dataBySurvivingByEmbarked.data
    .filter(d => d.Puerto && ($filters.male && d.Sex === "male" || $filters.female && d.Sex === "female"))
    .reduce((acc, d) => {
      if (!acc[d.Puerto]) acc[d.Puerto] = { Puerto: d.Puerto, count: 0 };
      acc[d.Puerto].count += d.count;
      return acc;
    }, {});

  $: filteredDataArray = Object.values(filteredData);

  $: maxCount = filteredDataArray.length > 0 ? Math.max(...filteredDataArray.map(d => d.count)) : 1;

  function barHeight(count) {
    return (count / maxCount) * 100 + "%";
  }
</script>

<main>
  <h2>Supervivientes por Puerto</h2>

  {#if filteredDataArray.length > 0}
    <div class="chart">
      {#each filteredDataArray as { Puerto, count } (Puerto)}
        <div animate:flip class="bar-container">
          <div class="bar {Puerto}" style="height: {barHeight(count)}; background-color: {colors[Puerto]}; width: 100%;">
            <span class="label">{count}</span>
          </div>
          <p class="category">{Puerto}</p>
        </div>
      {/each}
    </div>
  {:else}
    <p class="no-data">No hay datos disponibles para los filtros seleccionados.</p>
  {/if}
</main>
