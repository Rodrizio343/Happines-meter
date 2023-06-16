import { Person } from '@/models';
import { addFavorite } from '@/redux/states';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { AppStore } from '@/redux/store';

const PeopleTable = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const pageSize = 5;

  const statePeople = useSelector((store: AppStore) => store.people);
  const dispatch = useDispatch();
  const favoritePeople = useSelector((store: AppStore) => store.favorites)

  const findPerson = (person: Person) =>
    !!favoritePeople.find((p) => p.id === person.id);
  const filterPerson = (person: Person) =>
    favoritePeople.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person];
    dispatch(addFavorite(filteredPeople));
    setSelectedPeople(filteredPeople);
  };

  useEffect(() => {
    setSelectedPeople(favoritePeople)
  }, [favoritePeople])

  const columns = [
    {
      field: "actions",
      headerName: "",
      type: "actions",
      sorteable: false,
      minWidth: 50,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Checkbox
            size="small"
            checked={findPerson(params.row)}
            onChange={() => handleChange(params.row)}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'levelOfHappiness',
      headerName: 'Level of happiness',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    }
  ];
  return  (
  <DataGrid
    rows={statePeople}
    columns={columns} 
    disableColumnSelector
    disableRowSelectionOnClick
    autoHeight
    getRowId={(row: any) => row.id}
    initialState={{
      pagination: {
        paginationModel: {pageSize}
      }
    }}
  />
)};

export default PeopleTable;
