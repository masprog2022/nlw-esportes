import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "./styles/main.css";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { api } from "./services/api";

import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdModal } from './components/CreateAdModal';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  function handleCloseDialog() {
    setOpenDialog(false)
  }

  useEffect(() => {
    api
      .get("http://localhost:3001/games")
      .then((response) => setGames(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] flex flex-col items-center my-20 mx-auto">
      <img src={logoImg} alt="" />
      <h1 className="font-black text-6xl text-white mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <CreateAdBanner />
        <CreateAdModal handleCloseDialog={handleCloseDialog} />        
      </Dialog.Root>
    </div>
  );
}

export default App;
