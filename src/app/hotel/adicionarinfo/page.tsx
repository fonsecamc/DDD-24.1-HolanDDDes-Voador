// Perfil.tsx
"use client";
import Image from 'next/image';
import LoggedHeader from "@/app/LoggedHeader";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';

// Define o tipo para os dados do hotel
interface HotelData {
  nome: string;
  endereço: string;
  telefone: string;
  descrição: string;
}

const Hotel = () => {
  const [hotelData, setHotelData] = useState<HotelData>({ nome: '', endereço: '', telefone: '' , descrição: ''});
  const [phoneError, setPhoneError] = useState<string>('');
  const MAX_WORDS = 500;

  // Exportação de imagem
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // Recupera os dados do localStorage
    const nome = localStorage.getItem('nome') || '';
    const endereço = localStorage.getItem('endereço') || '';
    const telefone = localStorage.getItem('telefone') || '';
    const descrição = localStorage.getItem('descrição') || '';

    // Define os dados do hotel
    setHotelData({ nome, endereço, telefone, descrição });
  }, []); // O array de dependências está vazio, então useEffect será chamado apenas quando preencher
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'descrição') {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > MAX_WORDS) return;
    }

    setHotelData(prev => ({ ...prev, [name]: value }));
    localStorage.setItem(name, value);

    if (name === 'telefone' && !validatePhoneNumber(value)) {
      setPhoneError('Número de telefone inválido');
    } else {
      setPhoneError('');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      Array.from(event.target.files).forEach((file) => {
        formData.append('files', file);
      });
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Upload bem-sucedido');
      } else {
        console.log('Erro ao fazer upload');
      }
    }
  };

  // Função para validar o número de telefone
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Expressão regular para verificar um formato de número de telefone básico
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <>
      <LoggedHeader />
      <main className="flex pt-[80px]">
      <div className="flex w-11/12 h-full justify-around">
      <div className="w-1/4 h-screen fixed left-[88px] top-[30px] flex flex-col items-center justify-center gap-[32px]">
            <div className="bg-[#D9D9D9]  p-[176px_128px] w-[430px] h-[466px] rounded-[10px] flex items-center justify-center">
              <Image src="/hotel_image.png" alt="Botar fotos" width={123.5} height={104.5} onClick={handleImageClick}/>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
            </div>
            <Link href="/hotel/adicionarinfo/editar_foto_hotel" passHref>
              <button className="mt-[20px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                Editar Fotos
              </button>
            </Link>
          </div>
          <div className="ml-[25%] w-[669px] h-[447px] relative top-[50px] flex flex-col">
          <div className="w-[816px] h-[723px] gap-[64px]">
          <div className="w-[669px] h-[358px] gap-[16px]">
            <div className="w-[245px] h-[118px] gap-[16px]">
              <h1 className="w-[245px] h=[66px] mb-[7px] font-poppins text-preto text-[44px] font-bold leading-[66px]"> Sem Nome</h1>
              <h4 className="w-[31px] h-[36px] font-normal text-[24px] leading-9 text-[#2EC00A]">0$</h4>
            </div>
            <div className="w-[669px] h-[224px] gap-2">
              <ul className="gap-[10px]">
                <li className="flex items-center gap-[10px] mb-[10px] w-[669px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Comece Renomeando seu Hotel; atribua endereço e telefone.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[427px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Adicione fotos do Hotel e dos quartos.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] mb-[10px] w-[351px] h-[50px] p-[10px] relative">
                <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Selecione suas Comodidades.
                  </h5>
                </li>
                <li className="flex items-center gap-[10px] w-[290px] h-[50px] p-[10px] relative">
                  <span className="bg-[url('/x.png')] w-[16px] h-[16px] bg-no-repeat bg-contain inline-block" aria-hidden="true"></span>
                  <h5 className="text-[20px] font-normal leading-[30px] font-poppins text-cinza-3">
                    Escreva sobre seu Hotel.
                  </h5>
                </li>
              </ul>
            </div>
            </div>
            <div className="flex flex-row items-top justify-center min-h-screen">
              <div className="mt-[64px] w-[816px] h-[150px] flex flex-row items-center justify-center">
                <div className="w-[675px] h-[110px] gap-[40px] flex items-center justify-center">
                  <div className="bg-branco-2 w-[280px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] flex items-center justify-center">
                    <div className="w-[120px] h-[78px] gap-2 flex flex-col justify-center text-center">
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">avaliações</h4>
                    </div>
                  </div>
                  <div className="bg-branco-2 w-[348px] h-[110px] rounded-[100px] py-[16px] px-[80px] gap-[64px] items-center justify-center">
                    <div className="w-[188px] h-[78px] gap-2 flex flex-col justify-center text-center">
                      <h3 className="font-readex-pro text-cinza-3 text-[32px] font-normal leading-10">0 dias</h3>
                      <h4 className="font-readex-pro text-cinza-2 text-[24px] font-normal leading-6">de hospedagem</h4>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className="mt-[-500px] w-[188px] h-[498px] gap-[24px]">
                <div className="w-[144px] h-[51px] gap-[16px] font-poppins font-semibold text-[34px] leading-[51px] -tracking-2 text-preto">
                  Quartos
                </div>
                <div className="w-[854px] h-[423px]">
                  <div className="w-[400px] h-[432px] top-[2px] rounded-[10px] p-[32px] gap-[56px] bg-branco-2 flex flex-col justify-center items-end">
                    <div className="w-[336px] h-[359px] gap-[16px]">
                      <div className="w-[336px] h-[287px] gap-[16px]">
                        <div className="w-[336px] h-[235px] rounded-[10px] bg-[#D9D9D9] flex justify-center items-center">
                          <div className="w-[243px] h-[36px] gap-[12px] flex justify-center items-center">
                            <Image src="/hotel_image.png" width={123.5} height={104.5} alt="Hotel" />
                          </div>
                        </div>
                        <Link href="/hotel/quarto"> 
                          <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">Adicione um Quarto</h4>
                        </Link>
                        <div className="mt-[-40px] w-[600px] h-[100px] gap-[4px] flex flex-col justify-end items-center">
                        <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3">
                          por noite:
                        </p>
                        <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2">R$ 0</h3>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[520px] h-[56px] gap-[32px] mt-[40px]">
              <div className="w-[800px] h-[56px] gap-[26px]">
              <div className="flex justify-center items-center">
              <Link href="/hotel/editar-comodidades" passHref>
                  <button className="mt-[32px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2">
                  Editar Comodidades
                  </button>
              </Link>
              </div>
              <div className="mt-[60px] flex flex-col">
                <h3 className=" w-[245px] h-[60px] font-poppins text-preto text-[32px] font-bold leading-[66px]"> Meus dados:</h3>
                <div className="w-full ml-8">
                  <h4 className="w-[245px] h-[66px] font-poppins text-preto text-[24px] font-medium leading-[66px]">Descrição</h4>
                  <input
                      type="text"
                      id="descrição"
                      name="descrição"
                      placeholder="/Escreva aqui uma descrição rápida do seu hotel (máx. 500 palavras)"
                      className="w-full h-full ml-20 border-none bg-transparent font-poppins font-normal text-cinza-2 text-[20px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0 overflow-hidden whitespace-pre-wrap break-words"
                      value={hotelData.descrição}
                      onChange={handleInputChange}
                    />
                </div>
                <div className="mt-[20px] ml-8"> 
                <Link href="/hotel/detalhar_informacao" passHref>
                  <button className="mt-[32px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center">
                    Detalhar Informações
                  </button>
                </Link>
                </div>
                <div className="flex flex-row mt-[60px]">
                <div className="w-[520px] h-[56px] flex items-center">
                  <div className="relative w-full peer h-10 border border-cinza-3 rounded-[10px] px-4 placeholder-transparent flex items-center">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Escreva aqui seu nome"
                      className="w-full h-full ml-20 border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                      value={hotelData.nome}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="nome"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-preto font-poppins font-medium text-[24px]"
                    >
                      Nome:
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-[60px]">
                <div className="w-[520px] h-[56px] flex items-center">
                  <div className="relative w-full peer h-10 border border-cinza-3 rounded-[10px] px-4 placeholder-transparent flex items-center">
                    <input
                      type="text"
                      id="endereço"
                      name="endereço"
                      placeholder="Escreva aqui seu endereço"
                      className="w-full h-full ml-[120px] border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                      value={hotelData.endereço}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="endereço"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-preto font-poppins font-medium text-[24px]"
                    >
                      Endereço:
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-[60px]">
                <div className="w-[520px] h-[56px] flex items-center">
                  <div className="relative w-full peer h-10 border border-cinza-3 rounded-[10px] px-4 placeholder-transparent flex items-center">
                    <input
                      type="text"
                      id="telefone"
                      name="telefone"
                      placeholder="Escreva aqui seu telefone"
                      className="w-full h-full ml-28 border-none bg-transparent font-poppins font-normal text-cinza-2 text-[24px] no-border focus:outline-none peer-focus:border-none peer-focus:ring-0"
                      value={hotelData.telefone}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="telefone"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-preto font-poppins font-medium text-[24px]"
                    >
                      Telefone:
                    </label>
                  </div>
                </div>
              </div>
              {phoneError && <p className="text-rosa-4 mt-2">{phoneError}</p>}
              <div className="flex flex-row mt-[10px] justify-between mb-[80px]"> 
                  <Link href="/hotel/adicionarinfo/postar" passHref>
                    <button className="mt-[32px] py-[15px] px-[20px] bg-rosa-4 text-white w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] -tracking-2 flex justify-center items-center">
                      Confirmar
                    </button>
                  </Link>
                  <Link href="/hotel" passHref>
                    <button className="mt-[32px] py-[15px] px-[20px] border-rosa-4 border-[2px] text-rosa-4 w-[340px] h-[57px] text-center gap-[10px] font-poppins text-[24px] font-normal leading-9 rounded-[10px] hover:bg-[#F42C46] hover:text-white -tracking-2 flex justify-center items-center">
                      Cancelar
                    </button>
                  </Link>
              </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hotel;