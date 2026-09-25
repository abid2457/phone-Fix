import { AlertCircle, Check, ChevronRight, Inbox, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { jobTone, paymentTone } from '@/lib/formatters';
import type { JobStatus, PaymentStatus } from '@/lib/types';
export function StatusBadge({status}:{status:JobStatus|PaymentStatus}){const tone=jobTone[status]??paymentTone[status]??'neutral';return <span className={cn('status-badge',`status-${tone}`)}><span className="status-dot"/>{status}</span>}
export function PageIntro({eyebrow,title,description,actions}:{eyebrow?:string;title:string;description:string;actions?:React.ReactNode}){return <div className="page-intro"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1><p>{description}</p></div>{actions&&<div className="page-actions">{actions}</div>}</div>}
export function MetricCard({label,value,detail,icon:Icon,tone='blue'}:{label:string;value:string;detail:string;icon:React.ComponentType<{className?:string}>;tone?:string}){return <article className="metric-card"><div className={cn('metric-icon',`tone-${tone}`)}><Icon/></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div></article>}
export function EmptyState({title='No results found',text='Nothing matches the current view.',action}:{title?:string;text?:string;action?:React.ReactNode}){return <div className="empty-state"><div className="empty-icon"><Inbox/></div><h3>{title}</h3><p>{text}</p>{action}</div>}
export function LoadingState(){return <div className="loading-grid" aria-label="Loading"><div className="skeleton-card"/><div className="skeleton-card"/><div className="skeleton-card"/></div>}
export function ErrorState(){return <div className="empty-state"><div className="empty-icon danger"><AlertCircle/></div><h3>Something went wrong</h3><p>We couldn't load this information.</p><button className="btn btn-outline">Try again</button></div>}
export function NextAction({children}:{children:React.ReactNode}){return <div className="next-action"><div className="next-action-icon"><ChevronRight/></div><div><span>Next action</span><strong>{children}</strong></div></div>}
export function CheckItem({children}:{children:React.ReactNode}){return <div className="check-item"><Check/>{children}</div>}
export function Busy(){return <LoaderCircle className="animate-spin"/>}
