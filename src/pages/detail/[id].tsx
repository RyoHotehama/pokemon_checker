import { Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.query.id);
  const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

  // ポケモン検索
  const response = await fetch(url);
  const pokemonData = await response.json();

  return {
    props: {
      data: pokemonData
    },
  };
};

type character = {
  name: string,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number
}

type parameter = {
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number
}

type characterMagnification = {
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number
}

const Detail: NextPage = ({data}: any) => {
  // 性格一覧
  const characters = [
    {name: 'さみしがり', attack: 1.1, defense: 0.9, specialAttack: 1, specialDefense: 1, speed: 1},
    {name: 'いじっぱり', attack: 1.1, defense: 1, specialAttack: 0.9, specialDefense: 1, speed: 1},
    {name: 'やんちゃ', attack: 1.1, defense: 1, specialAttack: 1, specialDefense: 0.9, speed: 1},
    {name: 'ゆうかん', attack: 1.1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 0.9},
    {name: 'ずぶとい', attack: 0.9, defense: 1.1, specialAttack: 1, specialDefense: 1, speed: 1},
    {name: 'わんぱく', attack: 1, defense: 1.1, specialAttack: 0.9, specialDefense: 1, speed: 1},
    {name: 'のうてんき', attack: 1, defense: 1.1, specialAttack: 1, specialDefense: 0.9, speed: 1},
    {name: 'のんき', attack: 1, defense: 1.1, specialAttack: 1, specialDefense: 1, speed: 0.9},
    {name: 'ひかえめ', attack: 0.9, defense: 1, specialAttack: 1.1, specialDefense: 1, speed: 1},
    {name: 'おっとり', attack: 1, defense: 0.9, specialAttack: 1.1, specialDefense: 1, speed: 1},
    {name: 'うっかりや', attack: 1, defense: 1, specialAttack: 1.1, specialDefense: 0.9, speed: 1},
    {name: 'れいせい', attack: 1, defense: 1, specialAttack: 1.1, specialDefense: 1, speed: 0.9},
    {name: 'おだやか', attack: 0.9, defense: 1, specialAttack: 1, specialDefense: 1.1, speed: 1},
    {name: 'おとなしい', attack: 1, defense: 0.9, specialAttack: 1, specialDefense: 1.1, speed: 1},
    {name: 'しんちょう', attack: 1, defense: 1, specialAttack: 0.9, specialDefense: 1.1, speed: 1},
    {name: 'なまいき', attack: 1, defense: 1, specialAttack: 1, specialDefense: 1.1, speed: 0.9},
    {name: 'おくびょう', attack: 0.9, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1.1},
    {name: 'せっかち', attack: 1, defense: 0.9, specialAttack: 1, specialDefense: 1, speed: 1.1},
    {name: 'ようき', attack: 1, defense: 1, specialAttack: 0.9, specialDefense: 1, speed: 1.1},
    {name: 'むじゃき', attack: 1, defense: 1, specialAttack: 1, specialDefense: 0.9, speed: 1.1},
    {name: 'てれや', attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1},
    {name: 'がんばりや', attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1},
    {name: 'すなお', attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1},
    {name: 'きまぐれ', attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1},
    {name: 'まじめ', attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1}
  ];

  // 初期個体値
  const individual =
  {
    hp: 31,
    attack:31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31
  };

  // 初期努力値
  const effort =
  {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  }

  // 初期性格倍率
  const characterMagnification =
  {
    attack: 1.1,
    defense: 0.9,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1
  }

  // 個体値
  const [individualValue, setIndividualValue] = useState<parameter>(individual);
  // 努力値
  const [effortValue, setEffortValue] = useState<parameter>(effort);
  // 性格
  const [characterValue, setcharacterValue] = useState<characterMagnification>(characterMagnification);

  // HP実数値計算
  const hpCalculation = (baseStat: number, individualValue: number, effortValue: number) => {
    return Math.floor((baseStat + individualValue / 2 + effortValue / 8) + 60);
  }

  // その他実数値計算
  const parameterCalculation = (baseStat: number, individualValue: number, effortValue: number, characterValue: number) => {
    return Math.floor(((baseStat + individualValue / 2 + effortValue / 8) + 5) * characterValue);
  }

  // 初期実数値
  const parameter =
  {
    hp: hpCalculation(data.stats[0].base_stat, individual.hp, effort.hp),
    attack: parameterCalculation(data.stats[1].base_stat, individual.attack, effort.attack, characterValue.attack),
    defense: parameterCalculation(data.stats[2].base_stat, individual.defense, effort.defense, characterValue.defense),
    'special-attack': parameterCalculation(data.stats[3].base_stat, individual.specialAttack, effort.specialAttack, characterValue.specialAttack),
    'special-defense': parameterCalculation(data.stats[4].base_stat, individual.specialDefense, effort.specialDefense, characterValue.specialDefense),
    speed: parameterCalculation(data.stats[5].base_stat, individual.speed, effort.speed, characterValue.speed)
  };
  const [realValue, setRealValue] = useState<any>(parameter);

  // 実数値計算（個体値変更）
  const handleRealValueChange = (event: any, stat: number) => {
    if (event.target.id == 'hp') {
      const status = hpCalculation(stat, event.target.value, effortValue.hp);
      setRealValue((realValue: any) => ({...realValue, hp: status}));
      setIndividualValue((individualValue: parameter) => ({...individualValue, hp: event.target.value}));
    } else if (event.target.id == 'attack') {
      const status = parameterCalculation(stat, event.target.value, effortValue.attack, characterValue.attack);
      setRealValue((realValue: any) => ({...realValue, attack: status}));
      setIndividualValue((individualValue: parameter) => ({...individualValue, attack: event.target.value}));
    } else if (event.target.id == 'defense') {
      const status = parameterCalculation(stat, event.target.value, effortValue.defense, characterValue.defense);
      setRealValue((realValue: any) => ({...realValue, defense: status}));
      setIndividualValue((individualValue: parameter) => ({...individualValue, defense: event.target.value}));
    } else if (event.target.id == 'special-attack') {
      console.log(event.target.value)
      const status = parameterCalculation(stat, event.target.value, effortValue.specialAttack, characterValue.specialAttack);
      setRealValue((realValue: any) => ({...realValue, 'special-attack': status}));
      setIndividualValue((individualValue: parameter) => ({...individualValue, specialAttack: event.target.value}));
    } else if (event.target.id == 'special-defense') {
      const status = parameterCalculation(stat, event.target.value, effortValue.specialDefense, characterValue.specialDefense);
      setRealValue((realValue: any) => ({...realValue, 'special-defense': status}));
      setIndividualValue({...individualValue, specialDefense: event.target.value});
    } else if (event.target.id == 'speed') {
      const status = parameterCalculation(stat, event.target.value, effortValue.speed, characterValue.speed);
      setRealValue((realValue: any) => ({...realValue, speed: status}));
      setIndividualValue((individualValue: parameter) => ({...individualValue, speed: event.target.value}));
    }
  };

  // 実数値計算（努力値変更）
  const handleIndividualValueChange = (event: any, stat: number) => {
    if (event.target.id == 'hp') {
      const status = hpCalculation(stat, individualValue.hp, event.target.value);
      console.log(individualValue.hp);
      setRealValue((realValue: any) => ({...realValue, hp: status}));
      setEffortValue((effortValue: parameter) => ({...effortValue, hp: event.target.value}));
    } else if (event.target.id == 'attack') {
      const status =  parameterCalculation(stat, individualValue.attack, event.target.value, characterValue.attack);
      setRealValue((realValue: any) => ({...realValue, attack: status}));
      setEffortValue((effortValue: parameter) => ({...effortValue, attack: event.target.value}));
    } else if (event.target.id == 'defense') {
      const status =  parameterCalculation(stat, individualValue.defense, event.target.value, characterValue.defense);
      setRealValue((realValue: any) => ({...realValue, defense: status}));
      setEffortValue((effortValue: parameter) => ({...effortValue, defense: event.target.value}));
    } else if (event.target.id == 'special-attack') {
      const status =  parameterCalculation(stat, individualValue.specialAttack, event.target.value, characterValue.specialAttack);
      setRealValue((realValue: any) => ({...realValue, 'special-attack': status}));
      setEffortValue((effortValue: parameter) => ({...effortValue, specialAttack: event.target.value}));
    } else if (event.target.id == 'special-defense') {
      const status =  parameterCalculation(stat, individualValue.specialDefense, event.target.value, characterValue.specialDefense);
      setRealValue((realValue: any) => ({...realValue, 'special-defense': status}));
      setEffortValue((effortValue: parameter) => ({...effortValue, specialDefense: event.target.value}));
    } else if (event.target.id == 'speed') {
      const status =  parameterCalculation(stat, individualValue.speed, event.target.value, characterValue.speed);
      setRealValue( (realValue: any) => ({...realValue, speed: status}));
      setEffortValue((effortValue: parameter) => ({...effortValue, speed: event.target.value}));
    }
  };

  // 実数値計算
  const handleCharacterValueChange = (character: string) => {
    characters.map((value: character) => {
      if (value.name == character) {
        setcharacterValue({attack: value.attack, defense: value.defense, specialAttack: value.specialAttack, specialDefense: value.specialDefense, speed: value.speed});
        // 攻撃
        const attack = parameterCalculation(data.stats[1].base_stat, individualValue.attack, effortValue.attack, value.attack);
        // 防御
        const defense = parameterCalculation(data.stats[2].base_stat, individualValue.defense, effortValue.defense, value.defense);
        // 特攻
        const specialAttack = parameterCalculation(data.stats[3].base_stat, individualValue.specialAttack, effortValue.specialAttack, value.specialAttack);
        // 特防
        const specialDefense = parameterCalculation(data.stats[4].base_stat, individualValue.specialDefense, effortValue.specialDefense, value.specialDefense);
        // 素早さ
        const speed = parameterCalculation(data.stats[5].base_stat, individualValue.speed, effortValue.speed, value.speed);

        // 実数値セット
        setRealValue((realValue: any) => ({...realValue, attack: attack, defense: defense, 'special-attack': specialAttack, 'special-defense': specialDefense, speed: speed}));
      }
    })
  }

  // console.log(data);
  return (
    <Container maxWidth='md'>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant='h5'>図鑑No.{data.id}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5'>{data.name}</Typography>
        </Grid>
      </Grid>
      <Image
        src={data.sprites.other.dream_world.front_default}
        alt={data.name}
        width={800}
        height={300}
      />
      <Grid container>
        <Grid item>性格</Grid>
        <Grid item>
          <TextField
            id="outlined-select-currency"
            select
            label="性格"
            defaultValue='さみしがり'
            onChange={(event: any) => handleCharacterValueChange(event.target.value)}
          >
            {characters.map((character: character) => (
              <MenuItem key={character.name} value={character.name}>
                {character.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='right'>種族値</TableCell>
              <TableCell align='center'>個体値</TableCell>
              <TableCell align='center'>努力値</TableCell>
              <TableCell align="right">実数値</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.stats.map((status: any) => (
              <TableRow key={status.stat.name}>
                <TableCell>
                  {status.stat.name}
                </TableCell>
                <TableCell align="right">{status.base_stat}</TableCell>
                <TableCell align="right">
                  <TextField
                    id={status.stat.name}
                    label={status.stat.name}
                    type="number"
                    defaultValue='31'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event: object) => handleRealValueChange(event, status.base_stat)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id={status.stat.name}
                    label={status.stat.name}
                    type="number"
                    defaultValue='0'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event: object) => handleIndividualValueChange(event, status.base_stat)}
                  />
                </TableCell>
                <TableCell align="right">{realValue[status.stat.name]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
export default Detail
