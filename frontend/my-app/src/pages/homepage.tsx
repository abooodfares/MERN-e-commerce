import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'; // correct import
import ProudctCard from '../components/ProudctCard'; // keeping your file name ProudctCard
import { Product } from '../types/Productinterface';
import { BASE_URL } from '../constant/myconst';

export const HomePage = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL+'/products');
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Grid  container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid size={'auto'}  container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <ProudctCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

