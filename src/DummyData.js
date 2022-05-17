const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: '35' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: '42' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: '45' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: '16' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: '45' },
    { id: 6, lastName: 'Melisandre', firstName: 'null', age: '150' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: '44' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: '36' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: '65' },
    { id: 10, lastName: 'Snow', firstName: 'Jon', age: '35' },
    { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: '42' },
    { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: '45' },
    { id: 13, lastName: 'Stark', firstName: 'Arya', age: '16' },
    { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: '45' },
    { id: 15, lastName: 'Melisandre', firstName: 'null', age: '150' },
    { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: '44' },
    { id: 17, lastName: 'Frances', firstName: 'Rossini', age: '36' },
    { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: '65' },
  ];


  const SalesInvoiceRows = [
    {id: 1, inDate: '02 Dec, 2021', inNo: 'RI/54547/21-22', cName: 'Anjum Enterprises', cCode: 'CBP510075', totalQty: '480', total: '2424', city: 'Mandi', State: 'Himachal Pradesh'},
    {id: 2, inDate: '30 Dec, 2021', inNo: 'RI/54826/21-22', cName: 'Agarwal Book Depot - Shimla', cCode: 'CBP510042', totalQty: '110', total: '36400.00', city: 'Shimla', State: 'Himachal Pradesh'},
    {id: 3, inDate: '14 Dec, 2021', inNo: 'RI/54547/21-22', cName: 'Anjum Enterprises', cCode: 'CBP510075', totalQty: '580', total: '2124', city: 'Mandi', State: 'Himachal Pradesh'},
    
  ];


  const DirectoryRows = [
    {id: 1, AffCode: 'WZ-1586', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi', State: 'Delhi', Country: 'India'},
    {id: 2, AffCode: 'WB409', SchoolName: 'St. Stephen`s School Kalyani', Address: 'Industrial Growth Centre Phase - III Kalyani Nadia-741235', Board: 'CBSE', City: 'Nadia', State: 'West Bengal', Country: 'China'},
    {id: 3, AffCode: 'WZ-1586', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi', State: 'Delhi', Country: 'India'},
    {id: 4, AffCode: 'WZ-1586', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi', State: 'Delhi', Country: 'India'}
  ]

  const MySchoolRows = [
    {id: 1, CrmId: '1', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', RequestedOn: '20-04-2020', UpdatedOn: '23-08-2019'},
    {id: 2, CrmId: '2', SchoolName: 'St. Stephen`s School Kalyani', Address: 'Industrial Growth Centre Phase - III Kalyani Nadia-741235', Board: 'CBSE', RequestedOn: '21-04-2020', UpdatedOn: '23-08-2019'},
    {id: 3, CrmId: '3', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi', RequestedOn: '20-04-2020', UpdatedOn: '21-08-2019'},
    {id: 4, CrmId: '4', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi',RequestedOn: '28-04-2020', UpdatedOn: '22-08-2019'}
  ]


  const TaggingRows = [
    {id: 1, CrmId: '1', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', RequestedOn: '20-04-2020', UpdatedOn: '23-08-2019'},
    {id: 2, CrmId: '2', SchoolName: 'St. Stephen`s School Kalyani', Address: 'Industrial Growth Centre Phase - III Kalyani Nadia-741235', Board: 'CBSE', RequestedOn: '21-04-2020', UpdatedOn: '23-08-2019'},
    {id: 3, CrmId: '3', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi', RequestedOn: '20-04-2020', UpdatedOn: '21-08-2019'},
    {id: 4, CrmId: '4', SchoolName: 'Saraswati Aanchal School', Address: 'WZ-1586, Nangal Rai, NEW DELHI', Board: 'ICSE', City: 'South West Delhi',RequestedOn: '28-04-2020', UpdatedOn: '22-08-2019'}
  ]


  const UpdateStocksRows = [
    {id: 1, BpCode: 'ALL000100', BpName: '(A)Agarwal Book Depot - Shimla'},
    {id: 2, BpCode: 'ALL000146', BpName: '	(A)Pepsu Book Depot'},
    {id: 3, BpCode: 'ALL000150', BpName: '	(A)Modern Book Shop-Chandigarh'},
    {id: 4, BpCode: 'ALL000132', BpName: '(A)Agarwal Book Depot - Shimla'}
  ]
  
  const OpportunitiesRows = [
    {id: 1,SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', DecisionMaker: 'DecisionMaker1', Status: 'active'},
    {id: 2,SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', DecisionMaker: 'DecisionMaker2', Status: 'active'},
    {id: 3,SchoolName: 'St. Stephen`s School Kalyani',  City: 'Rohtak', State: 'Haryana', DecisionMaker: 'DecisionMaker3', Status: 'inactive'},
    {id: 4,SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', DecisionMaker: 'DecisionMaker4', Status: 'inactive'},
    {id: 5,SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', DecisionMaker: 'DecisionMaker5', Status: 'active'}
  ]

  const ManageSchoolRows = [
    {id: 1, SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', Address: 'WZ-1586, Nangal Rai, NEW DELHI'},
    {id: 2, SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', Address: 'WZ-1586, Nangal Rai, NEW DELHI'},
    {id: 3, SchoolName: 'St. Stephen`s School Kalyani',  City: 'Rohtak', State: 'Haryana', Address: 'Industrial Growth Centre Phase - III Kalyani Nadia-741235'},
    {id: 4, SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', Address: 'WZ-1586, Nangal Rai, NEW DELHI'},
    {id: 5, SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', Address: 'WZ-1586, Nangal Rai, NEW DELHI'},
    {id: 6, SchoolName: 'Saraswati Aanchal School',  City: 'South West Delhi', State: 'Delhi', Address: 'WZ-1586, Nangal Rai, NEW DELHI'}
  ]

  export {rows, SalesInvoiceRows, DirectoryRows, MySchoolRows, TaggingRows, UpdateStocksRows, OpportunitiesRows, ManageSchoolRows}