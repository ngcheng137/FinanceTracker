import { Auth } from "@/_components/Auth"
import DemoRoute from "@/_components/DemoRoute"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div>
                <DemoRoute/>
            </div>
        </div>
    </div>
}