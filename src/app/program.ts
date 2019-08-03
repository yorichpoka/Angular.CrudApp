import { AppStartService } from './services/appstart.service';

export function main(appStartService : AppStartService) {
    return () => appStartService.start();
}