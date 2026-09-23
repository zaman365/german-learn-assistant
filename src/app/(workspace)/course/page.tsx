import { requireUser } from "@/auth/server";
import { dashboard } from "@/learning/service";
import CourseMap from "@/components/course-map";
export default async function Course(){const user=await requireUser();const data=await dashboard(user.id);return <><div className="page-heading"><div><span className="eyebrow">YOUR COURSE</span><h1 style={{marginTop:12}}>A clear route. Your own pace.</h1><p className="muted">Learn C1 first, then prepare specifically for DTB C1.</p></div><span className="badge neutral">{data.stats.completed} / {data.stats.total} published lessons</span></div><CourseMap data={{catalog:data.catalog,modules:data.modules,routes:data.routes}}/></>;}
