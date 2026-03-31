import { useEffect } from 'react';
import { BettingPanel } from '~components/BettingPanel/BettingPanel';
import { Details } from '~components/Details/Details';
import { Footer } from '~components/Footer/Footer';
import { Header } from '~components/Header/Header';
import { RankingTable } from '~components/RankingTable/RankingTable';
import { loadGamesRanking } from '~store/gamesRanking/gamesRanking.actions';
import { useAppDispatch } from '~store/store';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadGamesRanking());
  }, [dispatch]);

  return (
    <main>
      <Header />
      <RankingTable />
      <BettingPanel />
      <Details />
      <Footer />
    </main>
  );
}

export default App;
