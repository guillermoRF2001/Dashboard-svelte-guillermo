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

<style>
  main {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    padding: 20px;
    color: #2c3e50;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #34495e;
  }

  .chart {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 200px;
    width: 85%;
    padding: 20px;
    gap: 20px;
   background-color: #FF5733;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    height: 100%;
  }

  .bar {
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transition: height 0.3s ease-in-out;
    min-height: 10px;
  }

  .bar:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  .label {
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .category {
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #2c3e50;
  }

  .no-data {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }
</style>