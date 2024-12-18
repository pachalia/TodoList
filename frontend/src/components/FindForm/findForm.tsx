import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { useEffect } from 'react';

export type FindFormValue = {
	todo: string;
};
interface IAddFormProps {
	onSubmit: SubmitHandler<FindFormValue>;
	setIsFind: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FindForm: React.FC<IAddFormProps> = ({ onSubmit, setIsFind }) => {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FindFormValue>({ mode: 'onChange' });

	const { field } = useController({
		name: 'todo',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	});

	useEffect(() => {
		!isValid ? setIsFind(false) : null;
	}, [isValid, setIsFind]);
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<input {...field} type="text" />
				<button type={'submit'} disabled={!isValid}>
					Искать
				</button>
			</form>
		</>
	);
};
