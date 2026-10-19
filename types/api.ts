export interface APIResponse<T> {
  state: boolean
  data: T
}

export type Paginated<T = unknown> = T & {
  pageId: number
  eachPerPage: number
  total: number
}

export interface GameExplorerData {
  searchValue: string
  games: Game[]
  gamesWithoutConsole: Game[]
  banner: Banner
  sliders: string[]
  category: Category
}

export interface Banner {
  _id: string
  title: string
  description: string
  image: string
  department: Department
  buttons: unknown[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
  type: Type
}

export enum Department {
  Game = "game",
}

export enum Type {
  Web = "web",
}

export interface Category {
  title: string
  categoryId: CategoryID
  _id: string
}

export interface CategoryID {
  _id: string
  title: string
}

export interface Game {
  _id: string
  isConfirm: boolean
  isWaiting: boolean
  isReject: boolean
  seenCount: number
  downloadCount: number
  like: number
  category: Category
  score: number
  title: string
  description?: string
  image: string
  images: string[]
  tags: string[]
  headerImage: HeaderImage
  companyName: CompanyName
  platform?: Type
  wAdsSimilar: boolean
  planes: unknown[]
  defaultScore: number
  addressablesEnabled?: boolean
  isLandscape: boolean
  runCount: number
  gameType: GameGameType
  ability: unknown[]
  award: unknown[]
  gameInfos: GameInfos
  level: number
  rating: number
  vitrinThirdPartyVendors: VitrinThirdPartyVendor[]
  isActive: boolean
  creator: Creator
  files: unknown[]
  reviewHistory?: ReviewHistory[]
  reviewStatus?: string
  reviewedBy?: ReviewedBy
  reviewedAt?: string
  confirmDate: string
  createdAt: string
  __v: number
  updatedAt: string
  webGameUri: string
  portraitHeaderImage?: string
  commentCount: number
  competitionCount: number
  userScoreCount: number
  department: Department
  gameLastVersionSize: GameLastVersionSize
  createdAtIso: string
  updatedAtIso: string
  video?: string
  portraitVideo?: null | string
  portraitStoreVideo?: string
  storeVideo?: string
}

export enum CompanyName {
  Lifelands = "Lifelands",
  LifelandsIR = "lifelands.ir",
  Vahid = "Vahid",
  VahidEbrahimi = "Vahid Ebrahimi",
}

export interface Creator {
  fullName: FullName
  userId: UserID
  _id: string
}

export enum FullName {
  VahidEbrahimi = "Vahid Ebrahimi",
  وحیدابراهیمی = "وحید ابراهیمی",
}

export interface UserID {
  _id: ReviewedBy
  role: Role
  userName: UserName
  userType: UserType
  isShowUserName: boolean
  isShowPhoneNumber: boolean
  isShowEmail: boolean
  endSubscription: string
  isShowFirstName: boolean
  isShowLastName: boolean
  profileImage: ProfileImage
  isShowProfileImage: boolean
  plan: Plan
  bookmarks: unknown[]
  isActive: boolean
  followingCount: number
  followersCount: number
  isConfirm: boolean
  isAdmin: boolean
  isDeveloper: boolean
  isSessionActive: boolean
  isPrivate: boolean
  currentState: CurrentState
  isInTournment: boolean
  sessionExpiry: string
  lastActivity: string
  sessionId: string
  createdAt: string
  updatedAt: string
  __v: number
  age: string
  firstName: FirstName
  gender: Gender
  lastName: LastName
  aboutMe: AboutMe
  sitePresence: SitePresence
  lastOnlineAt: string
  lastOnlineDuration: number
  totalOnlineSeconds: number
  connectionCount: number
  phoneNumber: PhoneNumber
  email: Email
}

export enum ReviewedBy {
  The6905Cabe4Cdc676B0B945C79 = "6905cabe4cdc676b0b945c79",
}

export enum AboutMe {
  GameDeveloper = "GameDeveloper",
}

export enum CurrentState {
  Online = "online",
}

export enum Email {
  ایمیلمخفیشده = "ایمیل مخفی شده",
}

export enum FirstName {
  وحید = "وحید",
}

export enum Gender {
  Man = "man",
}

export enum LastName {
  ابراهیمی = "ابراهیمی",
}

export enum PhoneNumber {
  شمارهتماسمخفیشده = "شماره تماس مخفی شده",
}

export enum Plan {
  None = "none",
}

export enum ProfileImage {
  ProfileFile1784448807411JPEG = "profile/file-1784448807411.jpeg",
}

export enum Role {
  User = "user",
}

export interface SitePresence {
  kind: CurrentState
  meta: Meta
  updatedAt: string
}

export type Meta<T = unknown> = Record<string, T>

export enum UserName {
  LifeLandsDeveloper = "LifeLands_Developer",
}

export enum UserType {
  Gamer = "Gamer",
}

export interface GameInfos {
  namayeshBazi: boolean
  emkanBazi: boolean
  faqatAdminHaBeBinand: boolean
  namayeshRagbat: boolean
  namayeshLeaderBoard: boolean
  namayeshCommentHa: boolean
  namayeshLanding: boolean
  landingOrder: number
  gameType: GameInfosGameType
  gameCategory: GameCategory
  usesNewCompetitionProtocol: boolean
  _id: string
}

export enum GameCategory {
  BothAgeCategory = "both-age-category",
  Empty = "",
}

export enum GameInfosGameType {
  BothGameType = "both-game-type",
  Empty = "",
  RecordsGameType = "records-game-type",
  StepsGameType = "steps-game-type",
}

export enum GameLastVersionSize {
  NaNUndefined = "NaN undefined",
}

export enum GameGameType {
  Main = "main",
}

export enum HeaderImage {
  GameFile1779891966238PNG = "game/file-1779891966238.png",
  PlaceholderHeaderPlaceholderPNG = "placeholder/header-placeholder.png",
}

export interface ReviewHistory {
  status: string
  reason: null
  actorUserId: ReviewedBy
  at: string
  _id: string
}

export type VitrinThirdPartyVendor = "rubika" | "soroush"
