import type { LucideIcon } from 'lucide-react'
import {
  Palette, Type, Layers, Download, Eye, Grid3X3,
  Bell, Star, Mail, ArrowRight, Play, Search, Settings,
  Home, User, Heart, Share2, Check, Plus, Trash2, X,
  ChevronLeft, ChevronRight, Moon, Sun, Upload, Loader2,
} from 'lucide-react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faPalette, faFont, faLayerGroup, faDownload, faEye, faTableCells,
  faBell, faStar, faEnvelope, faArrowRight, faPlay, faMagnifyingGlass,
  faGear, faHouse, faUser, faHeart, faShareNodes, faCheck, faPlus,
  faTrash, faXmark, faChevronLeft, faChevronRight, faMoon, faSun,
  faUpload, faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import {
  faBell as faBellReg,
  faStar as faStarReg,
  faHeart as faHeartReg,
  faEnvelope as faEnvelopeReg,
  faEye as faEyeReg,
} from '@fortawesome/free-regular-svg-icons'

export type IconName =
  | 'palette' | 'type' | 'layers' | 'download' | 'eye' | 'grid'
  | 'bell' | 'star' | 'mail' | 'arrowRight' | 'play' | 'search'
  | 'settings' | 'home' | 'user' | 'heart' | 'share' | 'check'
  | 'plus' | 'trash' | 'close' | 'chevronLeft' | 'chevronRight'
  | 'moon' | 'sun' | 'upload' | 'loader'

export const lucideRegistry: Record<IconName, LucideIcon> = {
  palette: Palette,
  type: Type,
  layers: Layers,
  download: Download,
  eye: Eye,
  grid: Grid3X3,
  bell: Bell,
  star: Star,
  mail: Mail,
  arrowRight: ArrowRight,
  play: Play,
  search: Search,
  settings: Settings,
  home: Home,
  user: User,
  heart: Heart,
  share: Share2,
  check: Check,
  plus: Plus,
  trash: Trash2,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  moon: Moon,
  sun: Sun,
  upload: Upload,
  loader: Loader2,
}

export const faRegistry: Record<IconName, IconDefinition> = {
  palette: faPalette,
  type: faFont,
  layers: faLayerGroup,
  download: faDownload,
  eye: faEye,
  grid: faTableCells,
  bell: faBell,
  star: faStar,
  mail: faEnvelope,
  arrowRight: faArrowRight,
  play: faPlay,
  search: faMagnifyingGlass,
  settings: faGear,
  home: faHouse,
  user: faUser,
  heart: faHeart,
  share: faShareNodes,
  check: faCheck,
  plus: faPlus,
  trash: faTrash,
  close: faXmark,
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,
  moon: faMoon,
  sun: faSun,
  upload: faUpload,
  loader: faSpinner,
}

export const faRegularRegistry: Partial<Record<IconName, IconDefinition>> = {
  bell: faBellReg,
  star: faStarReg,
  heart: faHeartReg,
  mail: faEnvelopeReg,
  eye: faEyeReg,
}

export const materialRegistry: Record<IconName, string> = {
  palette: 'palette',
  type: 'text_fields',
  layers: 'layers',
  download: 'download',
  eye: 'visibility',
  grid: 'grid_view',
  bell: 'notifications',
  star: 'star',
  mail: 'mail',
  arrowRight: 'arrow_forward',
  play: 'play_arrow',
  search: 'search',
  settings: 'settings',
  home: 'home',
  user: 'person',
  heart: 'favorite',
  share: 'share',
  check: 'check',
  plus: 'add',
  trash: 'delete',
  close: 'close',
  chevronLeft: 'chevron_left',
  chevronRight: 'chevron_right',
  moon: 'dark_mode',
  sun: 'light_mode',
  upload: 'upload',
  loader: 'autorenew',
}
