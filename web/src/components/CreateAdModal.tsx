import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, Check, GameController } from 'phosphor-react';
import { toast } from 'react-toastify';

import { Input } from './Form/input';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Game {
  id: string;
  title: string;
}

interface CreateAdModalProps {
  handleCloseDialog: () => void
}

export function CreateAdModal({ handleCloseDialog }: CreateAdModalProps) {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [selectGame, setSelectGame] = useState<string>('')
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    api.get('http://localhost:3001/games')
    .then(response => setGames(response.data))
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()
    
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name) {
      return
    }
    try {
      await api.post(`http://localhost:3001/games/${selectGame}/ads`, {
        name: data.name,
        yearsPlayImg: Number(data.yearsPlayImg),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hoursStart: data.hoursStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      })
  
      toast.success('Anúncio criado com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      handleCloseDialog()
      
    } catch (error) {
      console.log(error)

      toast.error('Falha ao criar anúncio!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log(`name: ${data.name}`)
    console.log(`ano: ${data.yearsPlayImg}`)
    console.log(`discord: ${data.discord}`)
    console.log(`hora start: ${data.hoursStart}`)
    console.log(`hora fim: ${data.hourEnd}`)
    console.log(`name: ${useVoiceChannel}`)
  }
  
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/80 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <Select.Root onValueChange={setSelectGame}>
              <Select.Trigger 
                aria-label="Qual o game?" 
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 inline-flex items-center justify-between relative'
                id='game'
                name='game'
              >
                <Select.Value placeholder="Selecione o game que deseja jogar"/>
                <Select.Icon>
                  <CaretDown size={24}/>
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='bg-zinc-900 overflow-hidden rounded text-sm inset-0 w-[400px]'>
                  <Select.Viewport className='text-white p-2'>
                    { games.map(game => {
                      return (
                        <Select.Item 
                          value={game.id} 
                          key={game.id}
                          className="flex cursor-pointer hover:bg-zinc-800 p-2 rounded relative"
                        >
                          <Select.ItemText>
                            {game.title}
                          </Select.ItemText>
                          <Select.ItemIndicator className='absolute right-2 flex-inline items-center justify-center'>
                            <Check className='w-4 h-4 text-emerald-400' />
                          </Select.ItemIndicator>
                        </Select.Item>
                      )
                    }) }
                  </Select.Viewport>
                </Select.Content> 
              </Select.Portal>             
            </Select.Root>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input 
              id="name" 
              name='name'
              placeholder='Como te chamam dentro do game?' 
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlayImg">Joga há quantos anos?</label>
              <Input 
                type="number" 
                id="yearsPlayImg" 
                name='yearsPlayImg'
                placeholder='Tudo bem ser ZERO' 
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input 
                id='discord' 
                name='discord'
                placeholder='Usuario#0000' 
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type='multiple' 
                className='grid grid-cols-4 gap-2'
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item 
                  value='0'
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Domingo'
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Segunda'
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value='2'
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Terça'
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value='3'
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Quarta'
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value='4'
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Quinta'
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value='5'
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Sexta'
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value='6'
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Sábado'
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
              
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hoursStart">Qual horário do dia?</label>

              <div className='grid grid-cols-2 gap-2'>
                <Input name='hoursStart' type="time" id="hoursStart" placeholder='De' />
                <Input name='hourEnd' type="time" id="hourEnd" placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root 
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if(checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close 
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
            >
              Cancelar
            </Dialog.Close>

            <button 
              type='submit'
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>

    </Dialog.Portal>
  )
}