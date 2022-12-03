import { ArrowBack } from '../../ArrowBack';
import { StyledHeaderTitle } from './StyledHeaderTitle';
import { UniversalHeaderWrapper } from './UniversalHeaderWrapper';

interface SettingHeaderProps {
    onBack?: () => void;
}

export const SettingHeader = ({ onBack }: SettingHeaderProps) => {
    return (
        <UniversalHeaderWrapper>
            <ArrowBack onClick={onBack} />
            <StyledHeaderTitle>Setting</StyledHeaderTitle>
        </UniversalHeaderWrapper>
    );
};
