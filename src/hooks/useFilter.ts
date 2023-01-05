type DataProps = [
  {
    id: string;
    judul: string;
    keterangan: string;
  }
];

export const useFilter = (data: DataProps, search: string) => {
  return data.filter((value) => {
    if (value.judul === search) return value;
    else if (value.judul.toLowerCase().includes(search.toLowerCase()))
      return value;
  });
};
