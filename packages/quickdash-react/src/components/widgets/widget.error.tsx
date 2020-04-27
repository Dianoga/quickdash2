import React from 'react';

type Props = React.PropsWithChildren<{}>;

export class WidgetErrorBoundary extends React.Component<
	Props,
	{ hasError: boolean; error?: Error }
> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch() {}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <p>{this.state.error?.message}</p>;
		}
		return this.props.children;
	}
}
