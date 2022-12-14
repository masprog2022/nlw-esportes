
import { MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner(){
  return (
    <div className="pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg overflow-hidden"> 
        <div className="bg-[#2a2634] px-8 py-6 rounded-t-lg flex justify-between items-center">
        <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <Dialog.Trigger className="bg-violet-500 py-3 px-4 text-white rounded hover:bg-violet-600 transition-colors flex items-center gap-2">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        
        </div>
      </div>
  )
}