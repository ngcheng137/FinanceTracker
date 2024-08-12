import { Auth } from "@/_components/Auth"
import DemoRoute from "@/_components/DemoRoute"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin" />
            </div>
            <div className="flex items-center justify-center bg-blue-100">
                <DemoRoute/>
            </div>
        </div>
    </div>
}