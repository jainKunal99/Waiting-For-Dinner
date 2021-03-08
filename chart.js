// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      
    
      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawProfitsChart);
google.charts.setOnLoadCallback(drawCostChart);
google.charts.setOnLoadCallback(drawSalesChart);
      function drawProfitsChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Profits');
        data.addColumn('number', 'Rs');
        var td1 = document.querySelectorAll(".rowItem1");
        var td2 = document.querySelectorAll(".profits");
        
        
        var rows=[[td1[0].textContent,Number(td2[0].textContent)]];
        for(var i =1;i<td1.length;i++)
        {
          rows.push([td1[i].textContent,Number(td2[i].textContent)]);
        }-
        data.addRows(rows);
        var h=80;
        h+=34*td1.length;
        // Set chart options
        var options = {'title':'Profits',
                       'width': "100%",
                       'height':h};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div_profits'));
        chart.draw(data, options);
      }

      function drawCostChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Costs');
        data.addColumn('number', 'Rs');
        var td1 = document.querySelectorAll(".rowItem1");
        var td2 = document.querySelectorAll(".costs");
        
        
        var rows=[[td1[0].textContent,Number(td2[0].textContent)]];
        for(var i =1;i<td1.length;i++)
        {
          rows.push([td1[i].textContent,Number(td2[i].textContent)]);
        }
        data.addRows(rows);
        var h=80;
        h+=34*td1.length;
        // Set chart options
        var options = {'title':'Costs',
                       'width': "100%",
                       'height':h};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div_cost'));
        chart.draw(data, options);
      }


      function drawSalesChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sales');
        data.addColumn('number', 'Rs');
        var td1 = document.querySelectorAll(".rowItem1");
        var td2 = document.querySelectorAll(".sales");
        
        
        var rows=[[td1[0].textContent,Number(td2[0].textContent)]];
        for(var i =1;i<td1.length;i++)
        {
          rows.push([td1[i].textContent,Number(td2[i].textContent)]);
        }
        data.addRows(rows);
        var h=80;
        h+=34*td1.length;
        // Set chart options
        var options = {'title':'Sales',
                       'width': "100%",
                       'height':h};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div_sales'));
        chart.draw(data, options);
      }