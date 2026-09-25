export type JobStatus = 'Received' | 'Diagnosis' | 'Estimate' | 'Waiting Approval' | 'Waiting Parts' | 'Repairing' | 'Quality Check' | 'Ready for Collection' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Partial' | 'Pending' | 'Failed';
export interface Customer { id:string; name:string; phone:string; email:string; city:string; totalJobs:number; activeJobs:number; totalSpent:number; lastVisit:string; devices:string[] }
export interface Technician { id:string; name:string; initials:string; specialization:string; activeJobs:number; completed:number; success:number; rating:number; status:'Available'|'Busy'|'Offline' }
export interface Job { id:string; customerId:string; customer:string; phone:string; device:string; brand:string; imei:string; complaint:string; technician:string; status:JobStatus; amount:number; paid:number; payment:PaymentStatus; updated:string; created:string; priority:'Normal'|'Urgent'|'Express'; nextAction:string; warranty?:boolean }
export interface Part { id:string; name:string; sku:string; category:string; stock:number; minimum:number; cost:number; price:number; supplier:string }
export interface Invoice { id:string; jobId:string; customer:string; amount:number; payment:PaymentStatus; date:string; status:'Issued'|'Paid'|'Overdue' }
export interface AppNotification { id:string; kind:'Jobs'|'Payments'|'Repairs'|'System'; title:string; message:string; time:string; read:boolean }
