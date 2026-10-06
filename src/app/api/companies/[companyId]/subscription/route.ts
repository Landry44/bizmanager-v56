import {NextResponse} from "next/server";
import {z} from "zod";
import {requireMembership} from "@/src/lib/auth";
import {getSubscription,PLAN_LIMITS} from "@/src/lib/subscription";

export async function GET(_request:Request,{params}:{params:Promise<{companyId:string}>}){
 try{const {companyId}=await params;await requireMembership(companyId);const sub=await getSubscription(companyId);return NextResponse.json({subscription:sub,plans:PLAN_LIMITS,featureMatrix:{basic:["Produits & stock","Ventes / caisse","Clients","Achats","Fournisseurs","Dépenses","Employés","Reçus","Trésorerie espèces"],advanced:["Tout Basic","Rapports avancés","Trésorerie complète","Factures / devis / bons de livraison / avoirs","Retours & remboursements","Paie avancée","Analyses de marge","Exports avancés"]}});}
 catch(e:any){return NextResponse.json({error:e?.message||"Accès refusé"},{status:e?.message==="UNAUTHENTICATED"?401:403});}
}

const schema=z.object({plan:z.enum(["FREE","BUSINESS","ENTERPRISE"])});
export async function POST(request:Request,{params}:{params:Promise<{companyId:string}>}){
 try{
  const {companyId}=await params;await requireMembership(companyId, ["OWNER","ADMIN"]);
  schema.safeParse(await request.json());
  return NextResponse.json({error:"La gestion des abonnements est centralisée par le Superadmin. Contactez BizManager pour activer ou modifier votre formule."},{status:403});
 }catch(e:any){return NextResponse.json({error:e?.message||"Accès refusé"},{status:e?.message==="UNAUTHENTICATED"?401:403});}
}
