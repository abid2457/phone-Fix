export const money = (value:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
export const jobTone: Record<string,string> = {
  'Received':'info','Diagnosis':'violet','Estimate':'indigo','Waiting Approval':'warning','Waiting Parts':'orange','Repairing':'info','Quality Check':'cyan','Ready for Collection':'success','Delivered':'complete','Cancelled':'danger',
};
export const paymentTone: Record<string,string> = {Paid:'success',Partial:'warning',Pending:'neutral',Failed:'danger'};
