$(document).ready(function () {
    const dataTable = $('#tbb').DataTable(); // Initialize an empty DataTable
  
    // Fetch the CSV file
    fetch('tbb.csv')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load CSV file.');
        return response.text();
      })
      .then(csvContent => {
        // Parse CSV with PapaParse
        Papa.parse(csvContent, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true, // Skip empty rows
          complete: function (results) {
            const data = results.data; // Parsed data as an array of objects
            const headers = results.meta.fields; // Header row from the CSV
  
            // Add headers to the table dynamically
            $('#tableHeader').empty();
            headers.forEach(header => $('#tableHeader').append(`<thead>${header}</thead>`));
  
            // Populate rows in the table
            data.forEach(row => {
              const rowData = headers.map(header => row[header] || ''); // Ensure the order matches headers
              dataTable.row.add(rowData);
            });
  
            // Re-render the DataTable
            dataTable.destroy(); // Reset the table
            $('#tbb').DataTable(); // Reinitialize with the new data
          },
          error: function (error) {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  });
  