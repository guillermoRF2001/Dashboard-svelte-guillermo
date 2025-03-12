<script>
  import * as d3 from 'd3'; 
  import { scaleLinear, line } from 'd3';
  import { dataBySurvivingBySexAndAge } from '../stores_titanic';

  let width = 600, height = 300;
  let margin = { top: 10, right: 15, bottom: 20, left: 20 }; 

  const colors = {
    "male": 'rgb(255, 14, 14)',  
    "female": 'rgb(149, 0, 255)' 
  };

  $: filteredData = $dataBySurvivingBySexAndAge.data;

  // Escalas
  $: xScale = scaleLinear()
    .domain([0, d3.max(filteredData, d => d.age)] || [0, 1]) 
    .range([margin.left, width - margin.right]);

  $: yScale = scaleLinear()
    .domain([0, d3.max(filteredData, d => d.count)] || [0, 1]) 
    .range([height - margin.bottom, margin.top]);

  $: lineGenerator = line()
    .x(d => xScale(d.age))
    .y(d => yScale(d.count));

  $: groupedData = d3.group(filteredData, d => d.Sex); 
</script>

<main>
  <h2>Supervivientes por Edad y Género</h2>

  {#if filteredData.length > 0}
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" width="100%">
      <!-- Eje X -->
      <g transform={`translate(0, ${height - margin.bottom})`}>
        {#each xScale.ticks() as tick}
          <text x={xScale(tick)} y="10" text-anchor="middle" font-size="10"> 
            {tick}
          </text>
        {/each}
        <text x={width / 2} y="20" text-anchor="middle" font-size="12">
          Edad
        </text>
      </g>

      <!-- Eje Y -->
      <g transform={`translate(${margin.left}, 0)`}>
        {#each yScale.ticks() as tick}
          <text x="-5" y={yScale(tick)} text-anchor="end" font-size="10"> 
            {tick}
          </text>
        {/each}
        <text x="-15" y={height / 2} text-anchor="middle" font-size="12" transform="rotate(-90)"> 
          Supervivientes
        </text>
      </g>

      <!-- Líneas y puntos -->
      {#each Array.from(groupedData) as [Sex, data]}
        <path
          d={lineGenerator(data)}
          fill="none"
          stroke={colors[Sex]}
          stroke-width="2"
        />
        {#each data as d}
          <circle
            cx={xScale(d.age)}
            cy={yScale(d.count)}
            r="3"
            fill={colors[Sex]}
          />
        {/each}
      {/each}
    </svg>
  {:else}
    <p class="no-data">No hay datos disponibles para los filtros seleccionados.</p>
  {/if}
</main>
