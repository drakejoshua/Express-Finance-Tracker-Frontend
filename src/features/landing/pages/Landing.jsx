import { useDialogProvider } from '../../../shared/providers/DialogProvider.jsx'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'

export default function Landing() {
    const { toggleTheme } = useTheme()

    return (
        <div>
            <button className='text-xl' onClick={ () => toggleTheme() }> toggle theme </button>
            This is the landing page
        </div>
    )
}
