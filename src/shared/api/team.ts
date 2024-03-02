import { AxiosResponse } from "axios";
import { EnemyTeamType, TeamType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllTeam = async (is_npc: boolean, is_hidden: boolean = false) => {
  const response: AxiosResponse<TeamType[]> = await axiosInstance.get(
    `/team`,
    { params: { is_npc: is_npc, is_hidden: is_hidden } }
  )
  
  return response
}

export const fetchOneTeam = async (team_id: number) => {
  const response: AxiosResponse<TeamType> = await axiosInstance.get(
    `/team/${ team_id }`,
  )
  
  return response
}

export const createTeam = async (team: TeamType) => {
  const response: AxiosResponse<TeamType> = await axiosInstance.post(
    `/team`,
    { ...team },
  )
  
  return response
}

export const updateTeam = async (team: TeamType, team_id: number) => {
  const response: AxiosResponse<TeamType> = await axiosInstance.put(
    `/team/${ team_id }`,
    { ...team },
  )
  
  return response
}

export const deleteTeam = async (team_id: number) => {
  const response: AxiosResponse = await axiosInstance.delete(
    `/team/${ team_id }`,
  )
  
  return response
}


// Enemy

// Team
export const fetchAllTeamEnemy = async (team_id: number) => {
  const response: AxiosResponse<EnemyTeamType[]> = await axiosInstance.get(
    `/team/${ team_id }/enemy`,
  )
  
  return response
}

export const fetchOneTeamEnemy = async (team_id: number, enemy_id: number) => {
  const response: AxiosResponse<EnemyTeamType> = await axiosInstance.get(
    `/team/${ team_id }/enemy/${ enemy_id }`,
  )
  
  return response
}

export const createTeamEnemy = async (enemy: EnemyTeamType, team_id: number) => {
  const response: AxiosResponse<EnemyTeamType> = await axiosInstance.post(
    `/team/${ team_id }/enemy`,
    { ...enemy },
  )
  
  return response
}

export const updateTeamEnemy = async (enemy: EnemyTeamType, enemy_id: number, team_id: number) => {
  const response: AxiosResponse<EnemyTeamType> = await axiosInstance.put(
    `/team/${ team_id }/enemy/${ enemy_id }`,
    { ...enemy },
  )
  
  return response
}


export const deleteTeamEnemy = async (enemy_id: number, team_id: number) => {
  const response: AxiosResponse<EnemyTeamType[]> = await axiosInstance.delete(
    `/team/${ team_id }/enemy/${ enemy_id }`,
  )
  
  return response
}