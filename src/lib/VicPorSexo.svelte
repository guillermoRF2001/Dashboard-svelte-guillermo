<script>
  import { arc, pie } from 'd3';
  import { dataByVictimsBySex, filters } from '../stores_titanic';
  import { flip } from "svelte/animate";

  let width = 300, height = 300;
  let radius = Math.min(width, height) / 2;

  const colors = {
      "male": '#45ff67',  
      "female": '#45d2ff' 
  };

  $: maxCount = $dataByVictimsBySex.total;
  $: console.log("dataByVictimsBySex: ", $dataByVictimsBySex);

  $: filteredData = $dataByVictimsBySex.data.filter(d => $filters[d.Sex]);

  $: pieData = filteredData.length > 0 ? pie().value(d => d.count)(filteredData) : [];
  $: arcGenerator = arc()
      .innerRadius(radius * 0.5) 
      .outerRadius(radius * 0.8); 

  function getColor(Sex) {
      return colors[Sex];
  }

  function formatLabel(Sex, count) {
      return `${Sex}: ${count}`;
  }
</script>

<main>
  <h2>Víctimas por Género</h2>

  {#if filteredData.length > 0}
      <svg width={width} height={height}>
          <g transform={`translate(${width / 2},${height / 2})`}>
              {#each pieData as d, i (d.data.Sex)}
                  <g animate:flip>
                      <path
                          d={arcGenerator(d)}
                          fill={getColor(d.data.Sex)}
                      />
                      <text
                          transform={`translate(${arcGenerator.centroid(d)})`}
                          text-anchor="middle"
                          fill="#34495e"
                          font-size="11"
                          font-weight="bold"
                      >
                          {formatLabel(d.data.Sex, d.data.count)}
                      </text>
                  </g>
              {/each}
          </g>
      </svg>
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

  .no-data {
      font-size: 18px;
      color: red;
      font-weight: bold;
  }
</style>
